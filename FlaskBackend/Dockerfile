FROM python:3.8.6-alpine
WORKDIR /code
ENV FLASK_APP=app/views.py
ENV FLASK_DEBUG=0
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev postgresql-dev
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
