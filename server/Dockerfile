FROM python:3.6-alpine
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
EXPOSE 8000
CMD ["gunicorn", "--worker-tmp-dir", "/dev/shm", "--workers=2", "--threads=4", "--worker-class=gthread", "-b", "0.0.0.0:8000", "app", "--enable-stdio-inheritance" , "--reload"]