const API_BASE_URL = 'http://localhost:5000/api';

export const loginUser = async (nationalId, role) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nationalId, role })
    });
    return await response.json();
  } catch (error) {
    console.error('خطأ في الاتصال بالخادم:', error);
    return { success: false, message: 'تعذر الاتصال بالخادم' };
  }
};

export const sendPageScan = async (imageBase64, studentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/camera/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, studentId })
    });
    return await response.json();
  } catch (error) {
    console.error('خطأ في معالجة الصورة:', error);
  }
};