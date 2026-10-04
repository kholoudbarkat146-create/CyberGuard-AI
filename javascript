document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('input[type="text"], input');
    const submitButton = document.querySelector('button'); // أو زر الفحص حسب التصميم عندك

    if (!inputField) return;

    // دالة الفحص والتحليل المحلي
    function analyzeURL() {
        const urlValue = inputField.value.trim();
        
        if (!urlValue) {
            alert('الرجاء إدخال رابط صالح أولاً!');
            return;
        }

        try {
            const parsedUrl = new URL(urlValue.includes('http') ? urlValue : https://${urlValue});
            
            // فحص مبدئي ذكي للروابط (قواعد أمان افتراضية)
            let riskScore = 0;
            let warnings = [];

            // فحص البروتوكول
            if (parsedUrl.protocol === 'http:') {
                riskScore += 40;
                warnings.warn('الرابط غير مشفر (HTTP)');
            }

            // فحص كلمات مشبوهة شائعة في الروابط الضارة
            const suspiciousKeywords = ['login', 'verify', 'update', 'free', 'win', 'account', 'banking'];
            const lowerUrl = parsedUrl.href.toLowerCase();
            
            suspiciousKeywords.forEach(keyword => {
                if (lowerUrl.includes(keyword) && !parsedUrl.hostname.includes('google') && !parsedUrl.hostname.includes('github')) {
                    riskScore += 25;
                }
            });

            // عرض النتائج للمستخدم
            let resultMessage = '';
            if (riskScore >= 40) {
                resultMessage = ⚠️ تحذير: هذا الرابط قد يكون مشبوهاً أو غير آمن! (مستوى الخطورة: ${riskScore}%);
                alert(resultMessage);
            } else {
                resultMessage = ✅ الرابط يبدو آمناً للاستخدام والنشر.;
                alert(resultMessage);
            }

        } catch (e) {
            alert('الرابط المدخل غير صحيح، تأكد من كتابته بشكل سليم.');
        }
    }

    // ربط الحدث بزر الفحص أو الضغط على Enter
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            analyzeURL();
        });
    }

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            analyzeURL();
        }
    });
});
