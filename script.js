```javascript
const imageInput =
    document.getElementById("imageInput");

const uploadBox =
    document.getElementById("uploadBox");

const imagePreview =
    document.getElementById("imagePreview");

const promptInput =
    document.getElementById("prompt");

const counter =
    document.getElementById("counter");

const generateBtn =
    document.getElementById("generateBtn");

const durationInput =
    document.getElementById("duration");

const aspectRatioInput =
    document.getElementById("aspectRatio");

const status =
    document.getElementById("status");

const videoContainer =
    document.getElementById("videoContainer");

const resultVideo =
    document.getElementById("resultVideo");

const downloadBtn =
    document.getElementById("downloadBtn");


let selectedImage = null;


/* =========================
   اختيار الصورة
========================= */

imageInput.addEventListener(
    "change",
    function () {

        const file = this.files[0];

        if (!file) {
            return;
        }

        selectedImage = file;


        const imageURL =
            URL.createObjectURL(file);


        imagePreview.innerHTML = "";


        const img =
            document.createElement("img");


        img.src = imageURL;

        img.alt = "الصورة المختارة";


        imagePreview.appendChild(img);


        imagePreview.style.display =
            "block";


        uploadBox.style.display =
            "none";


        status.textContent =
            "✓ تم اختيار الصورة";
    }
);


/* =========================
   الضغط على المعاينة
   لاختيار صورة جديدة
========================= */

imagePreview.addEventListener(
    "click",
    function () {

        imageInput.click();

    }
);


/* =========================
   عداد النص
========================= */

promptInput.addEventListener(
    "input",
    function () {

        const length =
            this.value.length;

        counter.textContent =
            `${length} / 1000`;
    }
);


/* =========================
   إنشاء الفيديو
========================= */

generateBtn.addEventListener(
    "click",
    async function () {

        /* التحقق من الصورة */

        if (!selectedImage) {

            status.textContent =
                "⚠️ اختر صورة أولاً";

            return;
        }


        /* التحقق من Prompt */

        const prompt =
            promptInput.value.trim();


        if (!prompt) {

            status.textContent =
                "⚠️ اكتب وصف الفيديو أولاً";

            promptInput.focus();

            return;
        }


        /* تعطيل الزر */

        generateBtn.disabled = true;


        status.textContent =
            "⏳ جاري تجهيز الفيديو...";


        videoContainer.style.display =
            "none";


        try {

            const formData =
                new FormData();


            formData.append(
                "image",
                selectedImage
            );


            formData.append(
                "prompt",
                prompt
            );


            formData.append(
                "duration",
                durationInput.value
            );


            formData.append(
                "aspectRatio",
                aspectRatioInput.value
            );


            /*
             * عنوان Backend
             *
             * سنربطه لاحقاً بالسيرفر
             * الخاص بك.
             */

            const response =
                await fetch(
                    "http://127.0.0.1:3000/generate-video",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            if (!response.ok) {

                throw new Error(
                    "Server error"
                );
            }


            const data =
                await response.json();


            if (!data.videoUrl) {

                throw new Error(
                    "Video URL missing"
                );
            }


            /* عرض الفيديو */

            resultVideo.src =
                data.videoUrl;


            downloadBtn.href =
                data.videoUrl;


            videoContainer.style.display =
                "block";


            status.textContent =
                "✓ تم إنشاء الفيديو بنجاح";


            /* الانتقال للفيديو */

            videoContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


        }

        catch (error) {

            console.error(error);


            status.textContent =
                "❌ حدث خطأ أثناء إنشاء الفيديو";


        }

        finally {

            generateBtn.disabled =
                false;
        }

    }
);


/* =========================
   أزرار التنقل
========================= */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


navItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                navItems.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================
   زر الإعدادات
========================= */

const settingsBtn =
    document.getElementById(
        "settingsBtn"
    );


settingsBtn.addEventListener(
    "click",
    function () {

        status.textContent =
            "⚙ إعدادات التطبيق";

    }
);
```
