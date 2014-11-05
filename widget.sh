#!/bin/bash

echo "Starting to zip file widget.."
cd widget
zip zipfile ./*

echo "finished zip, moving to widget folder"
mv zipfile.zip widget.wgt

cd ..
echo "Complete"
