
import numpy as np
import os
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask import Flask , request, render_template
#from werkzeug.utils import secure_filename
#from gevent.pywsgi import WSGIServer

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(os.path.join(os.getcwd(), UPLOAD_FOLDER)):
    os.makedirs(os.path.join(os.getcwd(), UPLOAD_FOLDER))


model = load_model("Logo_classification.h5",compile=False)
                 
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict',methods = ['GET','POST'])
def upload():
    if request.method == 'POST':
        f = request.files['image']
        print("current path")
        basepath = os.path.dirname(__file__)
        print("current path", basepath)
        filepath = os.path.join(basepath,'uploads',f.filename)
        print("upload folder is ", filepath)
        f.save(filepath)
        
        img = image.load_img(filepath,target_size = (224, 224)) 
        x = image.img_to_array(img)
        print(x)
        x = np.expand_dims(x,axis =0)
        print(x)
        y=model.predict(x)
        preds=np.argmax(y, axis=1)
        
        #preds = model.predict_classes(x)
        print("prediction",preds)
        # index = ['Bear','Crow','Elephant','Rat']
        index = ['Adidas', 'Amazon', 'Android', 'Apple', 'Ariel', 'BMW', 'Bic', 'Burger King', 'Cadbury', 'Chevrolet', 'Chrome', 'Coca Cola', 'Cowbell', 'Dominos', 'Fila', 'Gillette', 'Google', 'Goya oil', 'Guinness', 'Heinz', 'Honda', 'Hp', 'Huawei', 'Instagram', 'KFC', 'Krisspy Kreme', 'Lays', 'Levis', 'Lg', 'Lipton', 'Mars', 'Marvel', 'McDonald', 'Mercedes Benz', 'Microsoft', 'MnM', 'Mtn', 'Mountain dew', 'NASA', 'Nescafe', 'Nestle', 'Nestle milo', 'Netflix', 'Nike', 'Nutella', 'Oral-B', 'Oreo', 'Pay pal', 'Peak milk', 'Pepsi', 'PlayStation', 'Pringles', 'Puma', 'Reebok', 'Rolex', 'Samsung', 'Sprite', 'Starbucks', 'Tesla', 'Tiktok', 'Twitter', 'YouTube', 'Zara']
        
        # result = str(index[pred_class[0]])
        text = "The classified Logo is of \"" + str(index[preds[0]] + "\"")
    return text
if __name__ == '__main__':
    app.run(debug = False, threaded = False)
