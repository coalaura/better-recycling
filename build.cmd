@echo off

echo Cleanup...

if EXIST "Better Recycling.zip" (
    del "Better Recycling.zip"
)

echo Building...
7z a -tzip "Better Recycling.zip" "data" "pack.mcmeta" "pack.png" >nul

echo Done.