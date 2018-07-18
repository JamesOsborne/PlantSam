from flask import Flask, jsonify, session, render_template

from random import random
from datetime import datetime

app = Flask(__name__)
app.debug = True
app.secret_key = '29f8qw98asdf98qu39rv8uwnsod8f9238ruqmoef8hmor8yn09qg8pas0f98m1yho'

def iterate(plant, times=1):
    if times <= 0: return plant
    new_branches = [doiterate(b, 1) for b in plant['branches']]
    other_branches = ([
        {
            'width': 1,
            'branches': [
                {
                    'width': 1,
                    'branches': [
                        {
                            'width': 1,
                            'branches': [],
                            'angle': -.5,
                            'length': 1
                        },
                        {
                            'width': 1,
                            'branches': [],
                            'angle': .5,
                            'length': 1
                        },
                    ],
                    'angle': -.5,
                    'length': 1
                },
                {
                    'width': 1,
                    'branches': [
                        {
                            'width': 1,
                            'branches': [],
                            'angle': .5,
                            'length': 1
                        },
                        {
                            'width': 1,
                            'branches': [],
                            'angle': -.5,
                            'length': 1
                        }
                    ],
                    'angle': .5,
                    'length': 1
                },
            ],
            'angle': (random() - 0.5) / 10,
            'length': 5
        },
    ] if len(new_branches) == 2 and plant['length'] > 40 else [])
    new_plant = {
        'width': plant['width'] + (0.01 / (plant['width'] + 5)),
        'branches': new_branches + other_branches,
        'angle': plant['angle'],
        'length': plant['length'] + (0.5 / (plant['length'] + 10))
    }
    return lambda: iterate(new_plant, times - 1)

def doiterate(plant, times):
    f = iterate(plant, times)
    while callable(f):
        f = f()
    return f

def get_structure():
    return {
        'width': 4,
        'branches': [
            {
                'width': 3,
                'branches': [
                    {
                        'width': 3,
                        'branches': [],
                        'angle': -.5 + (random() - .5) / 10,
                        'length': 10,
                    },
                ],
                'angle': -.5 + (random() - .5) / 10,
                'length': 10,
            },
            {
                'width': 3,
                'branches': [
                    {
                        'width': 3,
                        'branches': [],
                        'angle': .5 + (random() - .5) / 10,
                        'length': 10,
                    },
                ],
                'angle': .5 + (random() - .5) / 10,
                'length': 10,
            }
        ],
        'angle': -1.57 + (random() - .5) / 10,
        'length': 30,
    }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/structure')
def structure():
    now = datetime.today()
    last_accessed = datetime.fromtimestamp(session.get('last_accessed', now.timestamp()))
    seconds_diff = (now - (last_accessed or now)).total_seconds()
    time_chunks = seconds_diff // 10
    last_structure = session.get('structure', None)
    structure = doiterate(last_structure, time_chunks) if last_structure else get_structure()
    session['structure'] = structure
    session['last_accessed'] = now.timestamp()
    response = jsonify(structure)
    return response

if __name__ == '__main__':
    app.run()
