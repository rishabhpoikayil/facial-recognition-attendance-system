from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

import base64
import subprocess
import os
import time
import datetime
import shutil

ATTENDANCE_LOG_DIR = './logs'
DB_PATH = './db'
for dir_ in [ATTENDANCE_LOG_DIR, DB_PATH]:
    if not os.path.exists(dir_):
        os.mkdir(dir_)

app = FastAPI()

origins = [
    "http://localhost:3000",  # Frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserLogin(BaseModel):
    image: str

class UserRegister(BaseModel):
    username: str
    image: str

def save_image(image_data: str, path: str):
    img_data = base64.b64decode(image_data.split(",")[1])
    with open(path, "wb") as f:
        f.write(img_data)


@app.post("/login/")
async def login(user: UserLogin):
    unknown_img_path = './.tmp.jpg'
    save_image(user.image, unknown_img_path)
    output = subprocess.check_output(['face_recognition', DB_PATH, unknown_img_path])
    output_str = output.decode()
    name = output_str.split(',')[1].rstrip()

    os.remove(unknown_img_path)

    if name in ['unknown_person', 'no_persons_found']:
        return {"message" : "Unknown user. Please register new user or try again."}
    else:
        epoch_time = time.time()
        date = time.strftime('%Y%m%d', time.localtime(epoch_time))
        with open(os.path.join(ATTENDANCE_LOG_DIR, '{}.csv'.format(date)), 'a') as f:
            f.write('{},{},{}\n'.format(name, datetime.datetime.now(), 'IN'))
            f.close()
        return {"message": "Welcome back! It's good to see you again, {}!".format(name)}


@app.post("/logout/")
async def logout(user: UserLogin):
    unknown_img_path = './.tmp.jpg'
    save_image(user.image, unknown_img_path)
    output = subprocess.check_output(['face_recognition', DB_PATH, unknown_img_path])
    output_str = output.decode()
    name = output_str.split(',')[1].rstrip()

    os.remove(unknown_img_path)

    if name in ['unknown_person', 'no_persons_found']:
        return {"message" : "Unknown user. Please register new user or try again."}
    else:
        epoch_time = time.time()
        date = time.strftime('%Y%m%d', time.localtime(epoch_time))
        with open(os.path.join(ATTENDANCE_LOG_DIR, '{}.csv'.format(date)), 'a') as f:
            f.write('{},{},{}\n'.format(name, datetime.datetime.now(), 'OUT'))
            f.close()
        return {"message": "Goodbye! Until we meet again, {}!".format(name)}


@app.post("/register_new_user/")
async def register_new_user(user: UserRegister):
    save_image(user.image, os.path.join(DB_PATH, '{}.jpg'.format(user.username)))
    return {"message": "User registered successfully.".format(user.username)}


@app.get("/logs/")
async def get_logs():
    filename = 'out.zip'
    shutil.make_archive(filename[:-4], 'zip', ATTENDANCE_LOG_DIR)
    return FileResponse(filename, media_type='application/zip',filename=filename)
