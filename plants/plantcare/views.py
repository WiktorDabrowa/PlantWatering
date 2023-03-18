from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Plant, Room
from .serializers import PlantSerializer, RoomSerializer
import requests
import json
from . import apikey

@api_view(['POST'])
def requestData(request):
    token = apikey.token
    request_data = json.loads(request.data['json'])
    query = request_data['data']
    r = requests.get(f'https://perenual.com/api/species-list?key={token}&q={query}')
    print(r)
    return Response(r.json())
    
    
@api_view(['GET','POST'])
def plants(request):
    print('Plants:')
    # GET request -> get all plants
    if request.method == 'GET':
        plants = Plant.objects.all()
        serializer = PlantSerializer(plants, many=True)
        return Response(serializer.data)
    # POST request -> add plant
    elif request.method == 'POST':
        room = Room.objects.get(id = request.data['localization'])
        watering = {
            'minumum':14,
            'frequent':7,
            'average':12
        }
        print(request.data)
        print(request.data['photo'])
        Plant.objects.create(
            name=request.data['name'],
            photo=request.data['photo'],
            localization=room,
            sunlight=request.data['sunlight'],
            water_how_often=watering(request.data['watering']),
        )
        return Response('data sent')

@api_view(['GET','PUT','DELETE'])
def plant(request,id):
    print('internal one')
    # GET request -> get single plant
    if request.method == 'POST':
        return Response('GET ONE')
    # PUT request -> update single plant
    if request.method == 'PUT':
        return Response(f'{item} edited')
    # DELETE request -> delete single plant
    if request.method == 'DELETE':
        item = Plant.objects.get(id=id)
        item.delete()
        return Response(f'{item} deleted')
    pass

@api_view(['GET'])
def rooms(request):
    rooms = Room.objects.all()
    if request.method == 'GET':
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)

@api_view(['PUT'])
def water(request, id):
    plant = Plant.objects.get(id=id)
    plant.save()
    serializer = PlantSerializer(plant, many=False)
    return Response(serializer.data)