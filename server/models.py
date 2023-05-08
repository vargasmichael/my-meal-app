# export FLASK_APP=app.py
# export FLASK_RUN_PORT=5555
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 
#  

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

from config import db, Api, app, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    serialize_rules = ('-meal_plans.users',)
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    
    meal_plans = db.relationship('Meal_Plan', backref='users')
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be read,')
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f"User('{self.username}')"
   
    
class Meal(db.Model, SerializerMixin):
    __tablename__ = 'meals'
    
    serialize_rules = ('-meal_plan.meals', '-meal_ingredients.meals',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    category = db.Column(db.String)
    
    meal_ingredients = db.relationship('Meal_Ingredient', backref='meals')
    meal_plan = db.relationship('Meal_Plan', backref='meals')
    
    
class Meal_Plan(db.Model, SerializerMixin):
    __tablename__ = 'meal_plans'
    
    serialize_rules = ("-users.meal_plan",'-meals.meal_plan', )
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    day_of_week = db.Column(db.String)
    meal_time = db.Column(db.String)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'))
    
 
class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'
    
    serialize_rules = ('-meal_ingredient.ingredients', )
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    
    meal_ingredients = db.relationship('Meal_Ingredient', backref='ingredients')
    

class Meal_Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'meal_ingredients'

    serialize_rules = ('-ingredients.meal_ingredients', '-meals.meal_ingredients', )
    
    id = db.Column(db.Integer, primary_key=True)
    meal_id = db.Column(db.Integer, db.ForeignKey('meals.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredients.id'))
    
  