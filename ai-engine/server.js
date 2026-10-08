const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/process-image', (req, res) => {
  const responseData = {
    status: "success",
    summary: "تم تحليل الصورة بنجاح وتوليد الشرح التعليمي",
    steps: [
      "تحديد القانون الأساسي لحساب كمية الحرارة",
      "المشار إليها بالكتلة والحرارة النوعية",
      "استخراج الناتج النهائي بوحدة الجول"
    ],
    has_3d_model: true,
    model_name: "thermal_energy_cube"
  };
  
  res.json(responseData);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});