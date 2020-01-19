"""OAuth module."""
from flask import redirect, session, request, jsonify, Blueprint, url_for, current_app as app
from flask_jwt_extended import create_access_token, create_refresh_token
from werkzeug import security

from services.user_services import create_user_service
from models.model import db, User

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/oauth')


def construct_oauth_blueprint(viarezo):
    """COnstructs oauth protocol."""

    @auth_bp.route('/login')
    def login():
        redirect_uri = url_for("auth_bp.authorize", _external=True)
        redirect_uri = app.config['VIAREZO_CALLBACK_URL']
        auth = viarezo.authorize_redirect(redirect_uri)
        return jsonify({'url': auth.location})

    @auth_bp.route('/logout')
    def logout():
        session.pop('viarezo_token', None)
        return jsonify({'msg': 'success'})

    @auth_bp.route('/callback')
    def callback():
        code = request.args.get('code')
        state = request.args.get('state')
        return redirect('http://localhost:8080/#/auth/callback?code={}&state={}'.format(code, state))

    @auth_bp.route('/authorize')
    def authorize():
        try:
            token = viarezo.authorize_token()
        except Exception:
            return jsonify({'msg': 'error'}), 400
        if token is None:
            return 'Access denied: reason=%s error=%s resp=%s' % (
                request.args['error'],
                request.args['error_description'],
                token
            )
        session['viarezo_token'] = (token, '')
        me = viarezo.get(app.config['VIAREZO_ME_PATH'])
        email = me.data['email']
        db.connect(reuse_if_open=True)
        users = User.select().where(User.email == email)
        db.close()
        if len(users) > 0:
            user = users[0]
        else:
            first_name = me.data['firstName']
            last_name = me.data['lastName']
            user = create_user_service(me.data)

        identity = {"id": user.id, "admin": user.admin}
        response = {'access_token': create_access_token(identity=identity),
                    'refresh_token': create_refresh_token(identity=identity)}
        return jsonify(response), 200

    def get_viarezo_oauth_token():
        return session.get('viarezo_token')
    return auth_bp
