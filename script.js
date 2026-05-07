// =============================================================================
// РОЗДІЛ 1: БАЗОВІ ФУНКЦІЇ (ЛОГІКА З ПОПЕРЕДНІХ ЛАБОРАТОРНИХ)
// =============================================================================

// Функція діалогу з користувачем щодо кількості гостей
function bookingDialogue() {
    let count; // Створюємо змінну для збереження кількості
    while (true) { // Запускаємо нескінченний цикл, поки не отримаємо правильне число
        count = prompt("На скільки осіб ви бажаєте забронювати столик?", "2");
        // Перевірка: чи не натиснута "Скасувати" (null) та чи є введення числом більше 0
        if (count !== null && count > 0 && !isNaN(count)) break; 
        alert("Будь ласка, введіть коректне число осіб.");
    }
    // Умовні конструкції для вибору зали в залежності від кількості гостей
    if (count <= 2) {
        alert(`Чудово! Для ${count} осіб ми пропонуємо затишний столик біля вікна.`);
    } else if (count <= 5) {
        alert(`Для вашої компанії з ${count} осіб ми підготували комфортний стіл у центрі.`);
    } else {
        alert(`Вас ${count} осіб! Ми запропонуємо вам наш просторий VIP-зал.`);
    }
}

// Функція виводу даних розробника в консоль та алертом
function showDevInfo(lastName, firstName, position) {
    console.log("--- Інформація про розробника ---");
    console.log(`Прізвище: ${lastName}\nІм'я: ${firstName}\nПосада: ${position}`);
    alert(`Розробник: ${lastName} ${firstName}\nПосада: ${position}`);
}

// Функція порівняння довжини назв двох страв
function compareDishes(str1, str2) {
    if (str1.length > str2.length) {
        alert("Довша назва: " + str1);
    } else if (str2.length > str1.length) {
        alert("Довша назва: " + str2);
    } else {
        alert("Назви страв мають однакову довжину.");
    }
}

// Функція, яка викликається через атрибут onclick прямо в HTML (для логотипу)
function inlineLogoClick() {
    console.log("Клік по лого (обробник через атрибут onclick)");
}


// =============================================================================
// РОЗДІЛ 2: ОСНОВНИЙ ЦИКЛ ВИКОНАННЯ (DOMContentLoaded)
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {

    // --- БЛОК 2.1: Маніпуляції з DOM (Завдання з Лаби №7) ---
    
    const footer = document.querySelector("footer"); // Шукаємо підвал сайту
    if (footer) {
        const tgButton = document.createElement("button"); // Створюємо нову кнопку
        tgButton.textContent = "Бронь через Telegram"; // Задаємо текст
        tgButton.style.cssText = "margin-left: 15px; padding: 5px 15px; background: #c19a6b; border: none; border-radius: 5px; cursor: pointer; color: #fff;";
        tgButton.onclick = () => { window.location.href = "https://t.me/telegram"; }; // Подія переходу
        footer.append(tgButton); // Додаємо кнопку в кінець футера
    }

    const prices = document.querySelectorAll(".price"); // Шукаємо всі ціни
    prices.forEach(price => price.classList.add("highlight-price")); // Додаємо їм CSS клас підсвітки

    const brandSpan = document.querySelector(".brand-name"); // Шукаємо назву бренду
    if (brandSpan) {
        // Повністю замінюємо елемент разом з тегами на новий варіант
        brandSpan.outerHTML = "<strong class='brand-name' style='color: gold; font-size: 1.1em;'>Metropole Premium</strong>";
    }

    const promoBox = document.querySelector(".promo-box"); // Шукаємо рекламний блок
    if (promoBox) {
        promoBox.textContent = "Доброго дня! Знижка 10% на перше замовлення!"; // Міняємо текст всередині
        setTimeout(() => promoBox.remove(), 10000); // Видаляємо через 10 сек (Таймер)
    }

    // Пошук Тірамісу та позначення його як відсутнього
    const tdElements = Array.from(document.querySelectorAll("td"));
    const tiramisuItem = tdElements.find(td => td.textContent.includes("Тірамісу"));
    if (tiramisuItem) {
        tiramisuItem.innerHTML = "<span style='color: red; text-decoration: line-through;'>Тірамісу (Відсутнє)</span>";
    }

    // =========================================================================
    // РОЗДІЛ 3: НОВИЙ ФУНКЦІОНАЛ (ДОДАНО У ЛАБОРАТОРНІЙ №8)
    // =========================================================================

    // --- Завдання: Різні типи обробників для об'єкта (Логотип) ---

    const logo = document.getElementById("main-logo"); // Отримуємо логотип за ID
    if (logo) {
        // 1. Обробник як властивість об'єкта (onmouseenter)
        // Спрацьовує, коли курсор просто заходить в зону елемента
        logo.onmouseenter = function() {
            console.log("Курсор наведено на логотип (властивість onmouseenter)");
        };

        // 2. Метод addEventListener для візуального ефекту
        // Додаємо тінь тексту при кліку
        logo.addEventListener("click", () => {
            logo.style.textShadow = "2px 2px 15px rgba(255, 215, 0, 0.9)";
            console.log("Додано ефект тіні при кліку (addEventListener)");
        });

        // 3. Об'єкт як обробник подій (для подвійного кліку)
        // Використовуємо спеціальний метод handleEvent всередині об'єкта
        const logoObjectHandler = {
            handleEvent(event) {
                console.log(`Подія: ${event.type}. Елемент: ${event.currentTarget.id}`);
                event.currentTarget.style.color = "gold"; // Фарбуємо лого в золото при dblclick
            }
        };
        logo.addEventListener("dblclick", logoObjectHandler);

        // --- Завдання: Видалення обробника подій ---
        const removeBtn = document.getElementById("remove-listener-btn"); // Кнопка "Вимкнути"
        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                // Видаляємо саме об'єкт-обробник подвійного кліку
                logo.removeEventListener("dblclick", logoObjectHandler);
                logo.style.color = ""; // Скидаємо колір до стандартного
                alert("Обробник подвійного кліку на логотип видалено!");
            });
        }
    }

    // --- Завдання: Делегування подій (Event Delegation) ---

    // 1. Делегування для списку (вибір страви)
    const popList = document.getElementById("popular-dishes-list"); // Контейнер списку
    if (popList) {
        popList.addEventListener("click", function(event) {
            // Перевіряємо, чи ми клікнули саме по пункту списку (LI)
            if (event.target.tagName === "LI") {
                // Видаляємо клас виділення у всіх сусідів
                Array.from(this.children).forEach(item => item.classList.remove("selected-item"));
                // Додаємо клас виділення тому, на кого клікнули
                event.target.classList.add("selected-item");
            }
        });
    }

    // 2. Делегування + Патерн "Поведінка" (Керування цінами)
    const tableControls = document.getElementById("table-controls"); // Контейнер кнопок
    if (tableControls) {
        tableControls.addEventListener("click", (event) => {
            // Зчитуємо назву дії з data-атрибута кнопки
            const action = event.target.dataset.action; 
            if (action === "hidePrices") {
                // Якщо дія "сховати" - робимо прозорість цін 0
                document.querySelectorAll(".price").forEach(p => p.style.opacity = "0");
            } else if (action === "showPrices") {
                // Якщо дія "показати" - повертаємо прозорість 1
                document.querySelectorAll(".price").forEach(p => p.style.opacity = "1");
            }
        });
    }

    // --- Завдання: Складні події миші (Drag-and-Drop бонусного купона) ---

    const widget = document.getElementById('drag-booking-widget'); // Наш жовтий купон
    if (widget) {
        let isDragging = false; // Стан: чи тримаємо ми зараз блок
        let shiftX, shiftY;     // Змінні для збереження зміщення курсора всередині блока

        // Коли натиснули ліву кнопку миші на купоні
        widget.addEventListener('mousedown', function(event) {
            // Обов'язково скидаємо прив'язки до країв, щоб top/left працювали коректно
            widget.style.bottom = 'auto';
            widget.style.right = 'auto';
            
            isDragging = true; // Активуємо режим перетягування
            
            const rect = widget.getBoundingClientRect(); // Отримуємо координати купона на екрані
            // clientX - координата миші, rect.left - лівий край блока. 
            // Їх різниця — це де саме всередині блока ми його "вхопили".
            shiftX = event.clientX - rect.left;
            shiftY = event.clientY - rect.top;

            widget.style.cursor = 'grabbing'; // Міняємо курсор на "кулачок"
            event.preventDefault();           // Забороняємо браузеру виділяти текст навколо
        });

        // Коли миша рухається по всьому документу
        document.addEventListener('mousemove', function(event) {
            if (!isDragging) return; // Якщо ми не тримаємо кнопку натиснутою — нічого не робимо

            // Нова позиція = поточна миша мінус початковий зсув у блоці
            let newX = event.clientX - shiftX;
            let newY = event.clientY - shiftY;

            // Обмежуємо рух рамками вікна (window.innerWidth / innerHeight)
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX + widget.offsetWidth > window.innerWidth) newX = window.innerWidth - widget.offsetWidth;
            if (newY + widget.offsetHeight > window.innerHeight) newY = window.innerHeight - widget.offsetHeight;

            // Застосовуємо нові координати через CSS
            widget.style.left = newX + 'px';
            widget.style.top = newY + 'px';
        });

        // Коли відпустили кнопку миші
        document.addEventListener('mouseup', () => {
            isDragging = false;           // Вимикаємо режим перетягування
            widget.style.cursor = 'grab'; // Повертаємо курсор до стану "долоні"
        });

        // Вимикаємо стандартне перетягування браузера (щоб він не думав, що ми копіюємо текст/картинку)
        widget.ondragstart = () => false;
    }

    // --- Завдання: Використання relatedTarget (Підсвітка рядків таблиці) ---

    const menuTableBody = document.querySelector('.menu-table tbody'); // Тіло таблиці меню
    if (menuTableBody) {
        // Подія: миша наведена на елемент
        menuTableBody.addEventListener('mouseover', (event) => {
            const row = event.target.closest('tr'); // Шукаємо найближчий батьківський рядок <tr>
            
            // relatedTarget показує, з якого елемента прийшла миша.
            // Якщо row.contains(relatedTarget) — значить ми просто перейшли між клітинками 
            // ОДНОГО рядка. Якщо ні — ми зайшли на абсолютно новий рядок.
            if (row && !row.contains(event.relatedTarget)) {
                row.style.backgroundColor = 'rgba(255, 215, 0, 0.15)'; // Додаємо фон
                row.style.transition = 'background-color 0.3s';        // Плавність
            }
        });

        // Подія: миша покинула елемент
        menuTableBody.addEventListener('mouseout', (event) => {
            const row = event.target.closest('tr');
            // Перевіряємо: якщо миша перейшла КУДИСЬ за межі поточного рядка
            if (row && !row.contains(event.relatedTarget)) {
                row.style.backgroundColor = ''; // Скидаємо фон
            }
        });
    }

}); // Кінець DOMContentLoaded