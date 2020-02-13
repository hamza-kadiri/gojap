"""Base blueprint."""
import requests
from flask import Blueprint, abort, jsonify, current_app as app

base_blueprint = Blueprint("base_blueprint", __name__, url_prefix="/")


@base_blueprint.route("", methods=["GET"])
def hello_world():
    """Random http route.

    Returns :
        "Hello world"
    """
    return "Hello world"


@base_blueprint.route("/japs", methods=["GET"])
def get_japs():
    """Jap list route.

    Returns :
        Japs list
    """
    url = "https://api.yelp.com/v3/businesses/search"
    params = {
        "term": "japonais a volonté",
        "locale": "fr_FR",
        "latitude": 48.754190,
        "longitude": 2.301974,
        "radius": 5000,
        "categories": "japonese",
        "sort_by": "distance",
    }
    headers = {
        "Authorization": f"Bearer {app.config['YELP_BEARER_TOKEN']}",
    }
    r = requests.get(url, params=params, headers=headers)
    return jsonify(r.json())


@base_blueprint.route("/orders", methods=["GET"])
def get_orders():
    """Orders list route.

    Returns :
        Orders list
    """
    url = "https://api.unsplash.com/search/photos"
    params = {
        "query": "sushi",
        "per_page": "30",
        "client_id": app.config["UNSPLASH_CLIENT_ID"],
    }
    r = requests.get(url, params=params)
    return jsonify(r.json())


@base_blueprint.route("/members", methods=["GET"])
def get_members():
    """Members list route.

    Returns :
        Members list
    """
    url = "https://randomuser.me/api/"
    params = {"results": "60"}
    r = requests.get(url, params=params)
    return jsonify(r.json())
