'''
Created on 08-Dec-2017

@author: Linga
'''
import random
random_number = random.randint(1, 9)
user_input = ""
choices = []
def ask_user():
    choices.append(1)
    user_input = int(input('Guess the number between 1 to 9 :'))
    if len(choices) < 4 :
        if user_input == random_number :
            print('Congratulations! you guessed correctly.')
            print('Bye..')
        elif user_input < random_number :
            if len(choices)== 3:
                print('Your loose. choices completed. ')
                print('Actual number is {0}'.format(random_number))
            else:
                print('your guessing number is less than the actual number.')
                print('guess again ..')
                ask_user()
        elif user_input > random_number :
            if len(choices)== 3:
                print('Your loose. choices completed. ')
                print('Actual number is {0}'.format(random_number))
            else:
                print('Your guessing number is more than the actual number.')
                print('guess again ..')
                ask_user()
    else:
        print('Your loose. choices completed. ')
        print('Actual number is {0}'.format(random_number))


ask_user()

