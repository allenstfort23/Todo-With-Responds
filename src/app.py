from flask import Flask, jsonify, request, json
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


todos = [
  { "label": "My first task", "done": False },
  { "label": "My second task", "done": False },

]

@app.route('/todos', methods=['GET'])
def hello_world():

  json_text = jsonify(todos)
  

  return json_text

@app.route('/todos', methods=['POST'])
def add_new_todo():
  request_body = request.data
  decoded_object = json.loads(request_body)
  print("Incoming request with the following body", request_body)
  todos.append(decoded_object)
  return jsonify(todos)

@app.route('/todos/<int:position>', methods=['DELETE'])
def delete_todo(position):
    print("This is the position to delete: ",position)
    todos.pop(position)
    return jsonify(todos), 200

@app.route('/todos/<int:position>', methods=['PUT'])
def upgrade_todo(position):
  request_body = request.data
  todo = jsonloads(request_body)
  if(todo["label"] == None or todo["done"] == None):
    return "This do not have a label", 400
  todos[position] = todo
  return jsonify(todos)


# These two lines should always be at the end of your app.py file.
if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3245, debug=True)