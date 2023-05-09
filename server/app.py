# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 
#  

#!/usr/bin/env python3

from flask import request, session, make_response, jsonify, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from models import User, Meal, Meal_Plan, Ingredient, Meal_Ingredient
from flask_cors import cross_origin



from config import app, db, api, bcrypt, CORS

class SignUp(Resource):
    def post(self):
        
        username = request.get_json()['username']
        password = request.get_json()['password']
        
        user = User(
            
            username = username,
            )
        
        # this is how to set the hashed password
        user.password_hash = password
        
        try:
            db.session.add(user)
            db.session.commit()
            
            session["user_id"] = user.id
            
            print(user.to_dict())
            
            return user.to_dict(), 201
        
        
    
        except IntegrityError:
            
            print("no, here!")
            
            return {'error': '422 unprocessable entity'}, 422
        
    # def options(self):
    #         response = jsonify({'message': 'Success'})
    #         response.headers.add('Access-Control-Allow-Origin', 'http://localhost:19006')
    #         response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    #         response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    #         return response    
        
        


class CheckSession(Resource):
    def get(self):
        
        if session.get("user_id"):
            user = User.query.filter_by(id=session["user_id"]).first()
            
            return user.to_dict(), 200
        
        return {"error": "no user logged in"}, 401
        


class Login(Resource):
    @cross_origin(supports_credentials=True)
    def get(self):
        return render_template('login.html')
    
    @cross_origin(supports_credentials=True)
    def post(self):
        request_json = request.get_json()
        username = request_json['username']
        password = request_json['password']
        user = User.query.filter_by(username=username).first()
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return user.to_dict(), 200
            
        return {"error": "invalid credentials"}, 401
    
    def login(self):
        return Login().get()
     
    def options(self):
            response = jsonify({'message': 'Success'})
            response.headers.add('Access-Control-Allow-Origin', 'http://localhost:19006')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
            response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            return response    

class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            
            return make_response("User logged out", 200)
        
        return {'error': 'no user logged in'}, 401

class All_Users(Resource):
    def get(self):
        
        all_users = User.query.all()
        user_list = []
        
        for user in all_users:
            new_user = {
                "id": user.id,
                "username": user.username
            }
            user_list.append(new_user)
        return make_response(user_list, 200)
    

class User_By_Id(Resource):
    def get(self, id):
        
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response("User not found", 404)
        
        response = make_response(user.to_dict(), 200)
        return response
    #works
    
    def delete(self, id):
        
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response("User not found", 404)
        
        db.session.delete(user)
        db.session.commit()
        return make_response("User deleted", 200)
    #works
    
    def patch(self, id):
        
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response("User not found", 404)
        
        data = request.get_json()
        user.username = data['username']
        
        db.session.commit()
        return make_response(user.to_dict(), 200)
    #works
    


class All_Meals(Resource):
    def get(self):
        
        all_meals = Meal.query.all()
        meal_list = []
        
        for meal in all_meals:
            new_meal = {
                "id": meal.id,
                "name": meal.name,
                "description": meal.description,
                "category": meal.category
            }
            meal_list.append(new_meal)
        return make_response(meal_list, 200)
    #works
    
    def post(self):
        
        data = request.get_json()
        new_meal = Meal(
            name = data['name'],
            description = data['description'],
            category = data['category']
        )
        
        db.session.add(new_meal)
        db.session.commit()
    #works
        


class Meal_By_Id(Resource):
    def get(self, id):
        meal = Meal.query.filter_by(id=id).first()
        if not meal:
            return make_response("Meal not found", 404)
        
        response = make_response(meal.to_dict(), 200)
        return response
    #works
    
    def delete(self, id):
        meal = Meal.query.filter_by(id=id).first()
        if not meal:
            return make_response("Meal not found", 404)
        
        db.session.delete(meal)
        db.session.commit()
        return make_response("Meal deleted", 200)
    #works
    
    def patch(self, id):
        meal = Meal.query.filter_by(id=id).first()
        if not meal:
            return make_response("Meal not found", 404)
    #works
    
        data = request.get_json()
        meal.name = data['name']
        meal.description = data['description']
        meal.category = data['category']
        
        db.session.commit()
        return make_response(meal.to_dict(), 200)



class All_Ingredients(Resource):
    def get(self):
        all_ingredients = Ingredient.query.all()
        ingredient_list = []
        for ingredient in all_ingredients:
            new_ingredient = {
                "id": ingredient.id,
                "name": ingredient.name
            }
            ingredient_list.append(new_ingredient)
        return make_response(ingredient_list, 200)
    #works
        
    def post(self):
        data = request.get_json()
        new_ingredient = Ingredient(
            name = data['name']
        )
        
        db.session.add(new_ingredient)
        db.session.commit()
        return make_response(new_ingredient.to_dict(), 200)
#works
            


class Ingredient_By_Id(Resource):
    def get(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return make_response("Ingredient not found", 404)
        
        response = make_response(ingredient.to_dict(), 200)
        return response
    
    def delete(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return make_response("Ingredient not found", 404)
    #delete works 
        
        db.session.delete(ingredient)
        db.session.commit()
        return make_response("Ingredient deleted", 200)
    
    def patch(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return make_response("Ingredient not found", 404)
        
        data = request.get_json()
        ingredient.name = data['name']
        
        db.session.commit()
        return make_response(ingredient.to_dict(), 200)
    


class All_Meal_Plan(Resource):
    def get(self):
        
        all_meal_plans = Meal_Plan.query.all()
        meal_plan_list = []
        for meal_plan in all_meal_plans:
            new_meal_plan = {
                "id": meal_plan.id,
            }
            meal_plan_list.append(new_meal_plan)
            return make_response(meal_plan_list, 200)
        
    def post(self):
        data = request.get_json()
        new_meal_plan = Meal_Plan(
            user_id = data['user_id'],
            day_of_week = data['day_of_the_week'],
            meal_time = data['meal_time'],
            meal_id = data['meal_id']
        )
        
        db.session.add(new_meal_plan)
        db.session.commit()



class Meal_Plan_By_Id(Resource):
    def get(self, id):
        print(session)
        user_id = session.get('user_id')
        if not user_id:
            return make_response("User not logged in", 401)
        
        meal_plans = Meal_Plan.query.filter_by(user_id=user_id).all()
        if not meal_plans:
            return make_response("Meal Plan not found", 404)
        
        meal_plan_dicts = [mp.to_dict() for mp in meal_plans]
        response = make_response(meal_plan_dicts, 200)
        return response
    
    def post(self, id):
        data = request.get_json()
        print(data, "Preston ")
        new_meal_plan = Meal_Plan(
            user_id = data["user_id"],
            meal_id = data['meal_id'],
        )
        db.session.add(new_meal_plan)
        db.session.commit()
    
    def delete(self, id):
        meal_plan = Meal_Plan.query.filter_by(id=id).first()
        if not meal_plan:
            return make_response("Meal Plan not found", 404)
        
        db.session.delete(meal_plan)
        db.session.commit()
        return make_response("Meal Plan deleted", 200)
    
    def patch(self, id):
        meal_plan = Meal_Plan.query.filter_by(id=id).first()
        if not meal_plan:
            return make_response("Meal Plan not found", 404)
        
        data = request.get_json()
        meal_plan.user_id = data['user_id']
        meal_plan.day_of_week = data['day_of_week']
        meal_plan.meal_time = data['meal_time']
        meal_plan.meal_id = data['meal_id']
        
        db.session.commit()
        return make_response(meal_plan.to_dict(), 200)
    
class All_Meal_Ingredient(Resource):
    def get(self):
        all_meal_ingredients = Meal_Ingredient.query.all()
        meal_ingredient_list = []
        for meal_ingredient in all_meal_ingredients:
            new_meal_ingredient = {
                "id": meal_ingredient.id,
                "meal_id": meal_ingredient.meal_id,
                "ingredient_id": meal_ingredient.ingredient_id,
            }
            meal_ingredient_list.append(new_meal_ingredient)
            return make_response(meal_ingredient_list, 200)
        
    def post(self):
        data = request.get_json()
        new_meal_ingredient = Meal_Ingredient(
            meal_id = data['meal_id'],
            ingredient_id = data['ingredient_id'],
            quantity = data['quantity']
        )
        
        db.session.add(new_meal_ingredient)
        db.session.commit()
            
        
class Meal_Ingredient_By_Id(Resource):
    def get(self, id):
        meal_ingredient = Meal_Ingredient.query.filter_by(id=id).first()
        if not meal_ingredient:
            return make_response("Meal Ingredient not found", 404)
        
        response = make_response(meal_ingredient.to_dict(), 200)
        return response
    
    def delete(self, id):
        meal_ingredient = Meal_Ingredient.query.filter_by(id=id).first()
        if not meal_ingredient:
            return make_response("Meal Ingredient not found", 404)
        
        db.session.delete(meal_ingredient)
        db.session.commit()
        return make_response("Meal Ingredient deleted", 200)
    
    def patch(self, id):
        meal_ingredient = Meal_Ingredient.query.filter_by(id=id).first()
        if not meal_ingredient:
            return make_response("Meal Ingredient not found", 404)
        
        data = request.get_json()
        meal_ingredient.meal_id = data['meal_id']
        meal_ingredient.ingredient_id = data['ingredient_id']
        meal_ingredient.quantity = data['quantity']
        
        db.session.commit()
        return make_response(meal_ingredient.to_dict(), 200)
    
api.add_resource(SignUp, '/api/signup')
api.add_resource(CheckSession, '/api/checksession')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(All_Users, '/api/users')
api.add_resource(User_By_Id, '/api/users/<int:id>')
api.add_resource(All_Meals, '/api/meals')    
api.add_resource(Meal_By_Id, '/api/meals/<int:id>')    
api.add_resource(All_Ingredients, '/api/ingredients')    
api.add_resource(Ingredient_By_Id, '/api/ingredients/<int:id>')    
api.add_resource(All_Meal_Plan, '/api/meal_plan')
api.add_resource(Meal_Plan_By_Id, '/api/meal_plan/<int:id>')    
api.add_resource(All_Meal_Ingredient, '/api/meal_ingredients')
api.add_resource(Meal_Ingredient_By_Id, '/api/meal_ingredients/<int:id>')



if __name__ == '__main__':
    app.run(port=5555, debug=True)
    
    
#     pipenv install
#     pipenv install SQLAlchemy
#      pipenv install SQLAlchemy
#     pipenv install flask
#     pipenv install flask-sqlalchemy
#     pipenv install flask_migrate
#     pipenv install flask_cors             ## lets us talk to the frontend without a CORS error ##
#     pipenv install flask-restful          ## If you want to make it RESTful instead of Vanilla ##
#     pipenv install flask-bcrypt           ## for password hashing
#     pipenv install importlib-resources
#     pipenv install jsonify
#     pipenv install requests
#     pipenv install faker                  ## if you want to use it to seed your data
#     pipenv install python-dotenv
#     pipenv install honcho
#     pipenv install gunicorn
#     pipenv install sqlalchemy-serializer
#     pipenv shell