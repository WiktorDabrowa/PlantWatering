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
    return Response(r.json())
    
    
@api_view(['GET','POST'])
def plants(request):
    print('internal all')
    # GET request -> get all plants
    if request.method == 'GET':
        plants = Plant.objects.all()
        serializer = PlantSerializer(plants, many=True)
        return Response(serializer.data)
    # POST request -> add plant
    pass

@api_view(['GET','PUT','DELETE'])
def plant(request):
    print('internal one')
    # GET request -> get single plant
    if request.method == 'POST':
        return Response('GET ONE')
    # PUT request -> update single plant
    # DELETE request -> delete single plant
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