from . import app
from .data import repository


def get_hit_count():
    return 1


@app.route('/initialize')
def initialize_db():
    repository.create_db()
    return "done"


@app.route('/')
def hello():
    count = get_hit_count()
    repository.create_action("click")
    return 'Hello World! I have been seen {} timess.\n'.format(count)
