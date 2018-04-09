'''
Created on 07-Apr-2018

@author: Linga
'''

class userDetails:
    def __init__(self,name):
        self.name = name
    def change_name(self,new_name):
        self.name = new_name

user_Details = userDetails("Linga")
print(user_Details.name)
user_Details.change_name('Ram')
print(user_Details.name);
    