
from django.urls import path
from .views import plants, plant, requestData, rooms, water

urlpatterns = [
    path('plants', plants , name='all_plants'),
    path('plant/<int:id>', plant, name='one_plant'),
    path('external_api', requestData, name='external_api'),
    path('rooms', rooms, name = 'rooms'),
    path('water/<int:id>', water, name='water_plant')
]