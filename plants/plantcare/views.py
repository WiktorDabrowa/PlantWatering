from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Plant
from .serializers import PlantSerializer
import requests
import apikey

@api_view(['POST'])
def requestData(request):
    token = apikey.token
    print('here')
    print(request.method)
    r = requests.get(f'https://trefle.io/api/v1/plants?token={token}')
    r.json()
    print(r.json())
    return Response('OK')
        
    
@api_view(['GET','POST'])
def plants(request):
    # GET request -> get all plants
    if request.method == 'GET':
        plants = Plant.objects.all()
        serializer = PlantSerializer(plants, many=True)
        return Response(serializer.data)
    # POST request -> add plant
    pass

@api_view(['GET','PUT','DELETE'])
def plant(request):
    # GET request -> get single plant
    if request.method == 'POST':
        return Response('GET ONE')
    # PUT request -> update single plant
    # DELETE request -> delete single plant
    pass
