from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({"error": "لم يتم إرسال أي صورة"}), 400
    
    file = request.files['image']
    
    # محاكاة تحليل الكاميرا والذكاء الاصطناعي للمحتوى الأردني
    time.sleep(1.5) # وقت المعالجة
    
    response_data = {
        "status": "success",
        "summary": "يتناول هذا الدرس مفهوم الطاقة الحرارية وطرق انتقالها (التوصيل، الحمل، والإشعاع) وتطبيقاتها في الحياة اليومية.",
        "steps": [
            "الخطوة 1: تحديد القانون الأساسي لحساب كمية الحرارة Q = m * c * ΔT.",
            "الخطوة 2: التعويض بالمشار إليها بالكتلة والحرارة النوعية.",
            "الخطوة 3: استخراج الناتج النهائي بوحدة الجول (Joule)."
        ],
        "has_3d_model": True,
        "model_name": "thermal_energy_cube"
    }
    
    return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(port=5001, debug=True)