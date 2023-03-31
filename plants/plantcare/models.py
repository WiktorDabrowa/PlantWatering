from django.db import models

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=30, unique=True)
    def __str__(self):
        return self.name
        
class Plant(models.Model):
    sunlight_choices = [
        ('full_shade','Full shade'),
        ('part_shade', 'Part shade'),
        ('sun_part_shade','Indirect sunlight'),
        ('full_sun','Full sun')
    ]
    name = models.CharField(max_length=30, unique=True)
    localization = models.ForeignKey(Room, on_delete=models.PROTECT)
    sunlight = models.CharField(max_length=30, choices=sunlight_choices)
    water_how_often = models.IntegerField()
    # auto_now will update this field every time object is saved
    last_watering = models.DateField(auto_now=True)
    photo = models.ImageField(upload_to='photos/')
    
    def __str__(self):
        return self.name
