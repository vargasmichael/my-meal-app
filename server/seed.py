from app import app
from models import db, User, Meal, Meal_Plan, Ingredient, Meal_Ingredient

with app.app_context():
    db.drop_all()
    db.create_all()
    
    print('Deleting data...')
    
    User.query.delete()
    Meal.query.delete()
    Meal_Plan.query.delete()
    Ingredient.query.delete()
    Meal_Ingredient.query.delete()
    
    print('Creating users...')
    
    u1 = User(username = 'Michael')
    u1.password_hash = "Michael"
    u2 = User(username = 'Abby')
    u2.password_hash = "Abby"
    u3 = User(username = 'Ben')
    u3.password_hash = "Ben"
    u4 = User(username = 'Jonah')
    u4.password_hash = "Jonah"
    u5 = User(username = 'Chris')
    u5.password_hash = "Chris"
    u6 = User(username = 'Dylan')
    u6.password_hash = "Dylan"
    u7 = User(username = 'Matthew')
    u7.password_hash = "Matthew"
    u8 = User(username = 'Preston')
    u8.password_hash = "Preston"
    u9 = User(username = 'Alex')
    u9.password_hash = "Alex"
    u10 = User(username = 'Gage')
    u10.password_hash = "Gage"
    
    users = [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10]
    db.session.add_all(users)
    db.session.commit()
    
    print('Creating meals...')
    
    #Lunch and Dinner
    m1 = Meal(name = 'Peanut Butter and Jelly and carrots',
              description = 'Peanut Butter and Jelly and carrots',
              category = 'Lunch'
              )
    m2 = Meal(name = 'Hot Dog with apple slices',
              description = 'Hot dog with apple slices',
              category = 'Lunch'
              )
    m3 = Meal(name = 'Taquitos with rice and beans',
              description = 'Taquitos with rice and beans. Top this with sour cream and salsa. And dont let the beans and rice touch!',
              category = 'Dinner'
              )
    m4 = Meal(name = 'Pizza and carrots',
              description = 'Half pepperoni and half cheese pizza with carrots, dont forget the hummus!',
              category = 'Dinner'
              )
    m5 = Meal(name = 'Quesadilla and orange slices',
              description = 'Quesadilla with mozzerella cheese and orange slices. Peel the orange for them and cut into slices.',
              category = 'Lunch'
              )
    m6 = Meal(name = 'Chicken Nuggets and applesauce',
              description = 'Only Dinosaurs chicken nuggets with applesauce.',
              category = 'Lunch'
              )
    m7 = Meal(name = 'Mac and Cheese',
              description = 'Kraft Mac and Cheese with mixed veggies.',
              category = 'Lunch'
              )
    m8 = Meal(name = 'Spaghetti and Meatballs',
              description = 'Spaghetti and Meatballs. Only do this on a bath night!',
              category = 'Dinner'
              )
    m9 = Meal(name = 'Tacos and tortilla chips',
              description = 'Hard and soft shell tacos with tortilla chips, and salsa',
              category = 'Dinner'
              )
    m10 = Meal(name = 'Sloppy Joes with cucumbers',
              description = 'Use the premade sloppy joe mix and add cucumbers.',
              category = 'Lunch'
              )
    m11 = Meal(name = 'Noodles and veggies',
              description = 'Whatever noodles you have with whatever veggies you have.',
              category = 'Lunch'
              )
    m12 = Meal(name = 'Fish Sticks with roasted potatoes',
              description = 'Homemade fish sticks with roasted potatoes.',
              category = 'Dinner'
              )
    m13 = Meal(name = 'Cheeseburger with mixed peppers and hummus',
              description = 'We have McDonalds at home! With mixed peppers and hummus.',
              category = 'Dinner'
              )
    m14 = Meal(name = 'Chicken Noodle Soup',
              description = 'Great for cleaning out the fridge! Make some sourdough bread to go with it.',
              category = 'Lunch'
              )
    m15 = Meal(name = 'Grilled Cheese and Tomato Soup',
              description = 'Good old grilled cheese and tomato soup.',
              category = 'Lunch'
              )
    m16 = Meal(name = 'Ravioli',
              description = 'Get those raviloli from Trader Joes and add some veggies.',
              category = 'Lunch'
              )
    m17 = Meal(name = 'Roasted veggies and fish',
              description = 'They will eventualy eat this.',
              category = 'Dinner'
              )
    m18 = Meal(name = 'Chicken fried rice',
              description = 'Clean out the fridge meal! Serve with soy sauce.',
              category = 'Dinner'
              )
    m19 = Meal(name = 'Chicken lettuce wraps',
              description = 'Great for on the go! Chicken salad on a lettuce wrap.',
              category = 'Lunch'
              )
    m20 = Meal(name = 'Tofu and veggies',
              description = 'Crowd pleaser!',
              category = 'Dinner'
              )
    #Snack
    m21 = Meal(name = 'Fruit Kabob',
              description = 'Grapes, strawberries, watermelon and bananas on a stick.',
              category = 'Snack'
              )
    m22 = Meal(name = 'Peanut Butter crackers',
              description = 'These should always be in your bag!',
              category = 'Snack'
              )
    m23 = Meal(name = 'Apples and peanut butter',
              description = 'Slice the apples and add peanut butter.',
              category = 'Snack'
              )
    m24 = Meal(name = 'veggies and hummus',
              description = 'Carrots, sliced peppers, cucumbers with hummus!',
              category = 'Snack'
              )
    m25 = Meal(name = 'Applesauce pouch',
              description = 'These should always be in your bag!',
              category = 'Snack'
              )
    m26 = Meal(name = 'Banana and peanut butter',
              description = 'Sliced banana and peanut butter!',
              category = 'Snack'
              )
    m27 = Meal(name = 'Zuchinni bread',
              description = 'Quick snack that will tide them over and keep them quiet!',
              category = 'Snack'
              )
    m28 = Meal(name = 'Dry Cereal',
              description = 'Bring this in the car at your own risk!',
              category = 'Snack'
              )
    m29 = Meal(name = 'Fruit Leather',
              description = 'When the kids say they are hungry but they just want to snack.',
              category = 'Snack'
              )
    m30 = Meal(name = 'Pretzels and cheese',
              description = 'Pretzels and cheese stick will satisfy any day!',
              category = 'Snack'
              )
    m31 = Meal(name = 'Granola bar',
              description = 'These should always be in your bag!',
              category = 'Snack'
              )
    #Breakfast
    m32 = Meal(name = 'Oatmeal',
              description = 'Add whatever you want to your instant oatmeal. Like fruit, nuts, chocolate chips or honey.',
              category = 'Breakfast'
              )
    m33 = Meal(name = 'Cereal',
              description = 'With milk, without milk doesnt matter!',
              category = 'Breakfast'
              )
    m34 = Meal(name = 'Smoothie',
              description = 'Kitchen sink smoothie!',
              category = 'Breakfast'
              )
    m35 = Meal(name = 'Waffles and fruit',
              description = 'Lets be real, eggos are the best!',
              category = 'Breakfast'
              )
    m36 = Meal(name = 'Panckaes with dipping sauces',
              description = 'have syrup, chocolate sauce, and peanut butter for dipping!',
              category = 'Breakfast'
              )
    m37 = Meal(name = 'Zuchinni Muffins with yogurt',
              description = 'Take the zuchinni bread recipe and make muffins and add yogurt.',
              category = 'Breakfast'
              )
    m38 = Meal(name = 'Yogurt and granola',
              description = 'You can add fruit to this too!',
              category = 'Breakfast'
              )
    m38 = Meal(name = 'Egg muffins',
              description = 'Easy breakfast sandwich, add cheese, egg, bacon, whatever you want!',
              category = 'Breakfast'
              )
    m39 = Meal(name = 'Baked oatmeal',
              description = 'Great for when you wanna use up the fruit in the fridge!',
              category = 'Breakfast'
              )
    m40 = Meal(name = 'Breakfast bars',
              description = 'Homeade with whatever you want! Oats, honey, chocolate chips, nuts, fruit.',
              category = 'Breakfast'
              )
    
    meals = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m12, m13, m14, m15, m16, m17, m18, m19, m20, 
             m21, m22, m23, m24, m25, m26, m27, m28, m29, m30, m31, m32, m33, m34, m35, m36, m37, m38, m39, m40]
    db.session.add_all(meals)
    db.session.commit()
    
    print("Creating meal plans...")
    
    mp1 = Meal_Plan(day_of_week = 'Monday', meal_time = "Breakfast", meal_id = 32, user_id = 1)
    mp2 = Meal_Plan(day_of_week = 'Monday', meal_time = "Lunch", meal_id = 1, user_id = 1)
    mp3 = Meal_Plan(day_of_week = 'Monday', meal_time = "Dinner", meal_id = 17, user_id = 1)
    mp4 = Meal_Plan(day_of_week = 'Monday', meal_time = "Snack", meal_id = 21, user_id = 1)
    
    mealplan = [mp1, mp2, mp3, mp4] 
    
    db.session.add_all(mealplan)
    db.session.commit()
    
    print("Creating ingredients...")
    
    i1 = Ingredient(name = 'Peanut Butter')
    i2 = Ingredient(name = 'Jelly')
    i3 = Ingredient(name = 'Bread')
    i4 = Ingredient(name = 'Carrots')
    i5 = Ingredient(name = 'Hot Dog')
    i6 = Ingredient(name = 'Hot Dog Bun')
    i7 = Ingredient(name = 'Apple')
    i8 = Ingredient(name = 'Taquitos')
    i9 = Ingredient(name = 'Rice')
    i10 = Ingredient(name = 'Beans')
    i11 = Ingredient(name = 'Pizza')
    i12 = Ingredient(name = 'Tortilla')
    i13 = Ingredient(name = 'Shredded Cheese')
    i14 = Ingredient(name = 'Chicken Nuggets')
    i15 = Ingredient(name = 'Applesauce')
    i16 = Ingredient(name = 'Mac and Cheese')
    i17 = Ingredient(name = 'Noodles')
    i18 = Ingredient(name = 'Spaghetti Sauce')
    i19 = Ingredient(name = 'Meatballs')
    i20 = Ingredient(name = 'Taco Shells')
    i21 = Ingredient(name = 'Taco Meat')
    i22 = Ingredient(name = 'Tortilla Chips')
    i23 = Ingredient(name = 'Shredded Lettuce')
    i24 = Ingredient(name = 'Sloppy Joe Meat')
    i25 = Ingredient(name = 'Hamburger Buns')
    i26 = Ingredient(name = 'Orange Slices')
    i27 = Ingredient(name = 'Cucumbers')
    i28 = Ingredient(name = 'Mixed veggies')
    i29 = Ingredient(name = 'Fish Sticks')
    i30 = Ingredient(name = 'Potatoes')
    i31 = Ingredient(name = 'Ground Beef')
    i32 = Ingredient(name = 'Tomato')
    i33 = Ingredient(name = 'Sliced Cheese')
    i34 = Ingredient(name = 'Hummus')
    i35 = Ingredient(name = 'Mixed Peppers')
    i36 = Ingredient(name = 'Chicken')
    i37 = Ingredient(name = 'Chicken Broth')
    i38 = Ingredient(name = 'Egg Noodles')
    i39 = Ingredient(name = 'Tomato Soup')
    i40 = Ingredient(name = 'Ravioli')
    i41 = Ingredient(name = 'Roasted Veggies')
    i42 = Ingredient(name = 'Tofu')
    i43 = Ingredient(name = 'Roasted Veggies')
    i44 = Ingredient(name = 'Grapes')
    i45 = Ingredient(name = 'Strawberries')
    i46 = Ingredient(name = 'Blueberries')
    i47 = Ingredient(name = 'Raspberries')
    i48 = Ingredient(name = 'Watermelon')
    i49 = Ingredient(name = 'Cantaloupe')
    i50 = Ingredient(name = 'Pineapple')
    i51 = Ingredient(name = 'Peanut Butter Crackers')
    i52 = Ingredient(name = 'Applesauce Pouch')
    i53 = Ingredient(name = 'String Cheese')
    i54 = Ingredient(name = 'Banana')
    i55 = Ingredient(name = 'Zuchinni')
    i56 = Ingredient(name = 'Cereal')
    i57 = Ingredient(name = 'Milk')
    i58 = Ingredient(name = 'Granola Bar')
    i59 = Ingredient(name = 'Yogurt')
    i60 = Ingredient(name = 'Pretzels')
    i61 = Ingredient(name = 'Yogurt')
    i62 = Ingredient(name = 'Granola')
    i63 = Ingredient(name = 'Eggs')
    i64 = Ingredient(name = 'Waffles')
    i65 = Ingredient(name = 'Oatmeal')
    i67 = Ingredient(name = 'English Muffin')
    i68 = Ingredient(name = 'Oats')
    i69 = Ingredient(name = 'Brown Sugar')    
    
    ingredients = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14, i15, i16, i17, i18, i19, i20, i21, i22, i23, i24, i25, i26, i27, i28, i29, i30, i31, i32, i33, i34, i34,
                i35, i36, i37, i38, i39, i40, i41, i42, i43, i44, i45, i46, i47, i48, i49, i50, i51, i52, i53, i54, i55, i56, i57, i58, i59, i60, i61, i62, i63, i64, i65, i67, i68, i69]
    
    db.session.add_all(ingredients)
    db.session.commit()
    
    print("Creating meal ingredients...")
    
    mi1 = Meal_Ingredient(meal_id = 1, ingredient_id = 1)
    mi2 = Meal_Ingredient(meal_id = 1, ingredient_id = 2)
    mi3 = Meal_Ingredient(meal_id = 1, ingredient_id = 3)
    mi4 = Meal_Ingredient(meal_id = 1, ingredient_id = 4)
    
    meal_ingredients = [mi1, mi2, mi3, mi4]
    
    db.session.add_all(meal_ingredients)
    db.session.commit()
    
    # p1 = Player(username = 'Dirty Mike')
    # p1.password_hash = "Michael"
    # p2 = Player(username = "Abatha")
    # p2.password_hash = "Abby"
    # p3 = Player(username = "Ben Dover")
    # p3.password_hash = "Ben"
    # p4 = Player(username = "Van Life")
    # p4.password_hash = "Alex"
    # p5 = Player(username = "Cwiss")
    # p5.password_hash = "Chris"
    # p6 = Player(username = "Jo-na-na-nah")
    # p6.password_hash = "Jonah"
    # p7 = Player(username = "Gagey Poo")
    # p7.password_hash = "Gage"
    # p8 = Player(username = "Princess Ruffian")
    # p8.password_hash = "Dylan"
    # p9 = Player(username = "Mr. Glass")
    # p9.password_hash = "Matthew"
    # p10 = Player(username = "The dark horse")
    # p10.password_hash = "Preston"
    
    # players = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
    
            
    # db.session.add_all(players)
    # db.session.commit()
    
    # print('Creating tiles...')
    
    # t1 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4JZfpQ6mVj8ln6iivtg2ozj3BlLfD4aXRZg&usqp=CAU')
    # t2 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfUpKuFE2IyiOg93GdJfY7YL0iXGnRfdkBHw&usqp=CAU')
    # t3 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNECPASq1pw7Xma3LjngqyS0438ZWubBT6_A&usqp=CAU')
    # t4 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj8dNYETUxRctek5phC5h1RuPnyybW21FpqQ&usqp=CAU')
    # t5 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShE_ulBMMi7j6WzQOABxEXuwPR_InXAfO7-g&usqp=CAU')
    # t6 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR53QAj8iZcyR_RcumtIX5BbcrJ181Mbs9_EzMBavv_Bw&s')
    # t7 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoj2N5l7VzXDVPJZtenHNAltUNKh3lK6uQLs_vbsyE&s')
    # t8 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMf1fWAOMKms1V1Hh4ECJeRCYB8IsiPgWxWl9d1l8Bzw&s')
    # t9 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpsV-LU69YRjJg2M_o89e1d3FL43n0lRuQRQ&usqp=CAU')
    # t10 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8M5MP6QxzFucVmNGeC6FJnQPWg0_0eVIU6A&usqp=CAU')
    # t11 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjD3TTI7kQbz3aBFe6PxfOglrxRHOzI0p-DQ&usqp=CAU')
    # t12 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOlPcuh0Ra2Y7FUAtdWsY6I3ngw50MRH7AFQ&usqp=CAU')
    # # t13 = Tile(image_url = ('')
    # t14 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmzaWPrX3ijm6B1MExdmlc9yNIcOsd65twCg&usqp=CAU')
    # t15 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR63IUamLD9AOJoZucSxkr_PKrw00zkztw5CQ&usqp=CAU')
    # t16 = Tile(image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoVYUhL4f_Tbx54zxKOHMYz-bl9qn7q7vHGg&usqp=CAU')
    
    # tiles = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t14, t15, t16]
    # db.session.add_all(tiles)
    # db.session.commit()
    
    # Things to ask David:
    # Recursion errors, should I have added a category, what is the direct way to link front end and back end?