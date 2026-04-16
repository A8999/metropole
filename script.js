// ==========================================
// ЧАСТИНА 1: ЛОГІКА ТА ФУНКЦІЇ
// ==========================================

// Функція 1: Діалог з користувачем (while, if/else)
function bookingDialogue() {
    let count;
    // Цикл працюватиме, поки користувач не введе число більше 0
    while (true) {
        count = prompt("На скільки осіб ви бажаєте забронювати столик? (Введіть число)", "2");
        if (count !== null && count > 0 && !isNaN(count)) break;
        alert("Будь ласка, введіть коректне число осіб.");
    }

    // Розгалуження для вибору зони
    if (count <= 2) {
        alert("Чудово! Для " + count + " осіб ми пропонуємо затишний столик біля вікна.");
    } else if (count <= 5) {
        alert("Для вашої компанії з " + count + " осіб ми підготували комфортний стіл у центрі зали.");
    } else {
        alert("Вас " + count + " осіб! Ми запропонуємо вам наш просторий VIP-зал.");
    }
}

// Функція 2: Інформація про розробника (з параметром за замовчуванням)
function showDevInfo(lastName, firstName, position = "FrontEnd Developer") {
    console.log("--- Інформація про розробника ---");
    console.log("Прізвище: " + lastName);
    console.log("Ім'я: " + firstName);
    console.log("Посада: " + position);
    alert(`Розробник: ${lastName} ${firstName}\nПосада: ${position}`);
}

// Функція 3: Порівняння рядків
function compareDishes(str1, str2) {
    if (str1.length > str2.length) {
        alert("Довша назва: " + str1);
    } else if (str2.length > str1.length) {
        alert("Довша назва: " + str2);
    } else {
        alert("Назви страв мають однакову довжину.");
    }
}

// === ВИКЛИКИ ФУНКЦІЙ ===
// Запускаємо діалог (можна закоментувати, якщо набридає при кожному оновленні)
bookingDialogue(); 

// Виклик інформації про розробника (тут підстав свої дані)
showDevInfo("A8999", "Ssss"); 

// Виклик порівняння рядків
compareDishes("Стейк з перцевим соусом", "Тірамісу");


// ==========================================
// ЧАСТИНА 2: РОБОТА З DOM ТА BOM
// ==========================================

// Використовуємо DOMContentLoaded, щоб JS працював тільки після завантаження всього HTML
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. BOM (location): Перенаправлення
    const footer = document.querySelector("footer");
    if (footer) {
        const tgButton = document.createElement("button");
        tgButton.textContent = "Бронь через Telegram";
        tgButton.style.cssText = "margin-left: 15px; padding: 5px 15px; background: var(--warm); border: none; border-radius: 5px; cursor: pointer; color: #fff;";
        
        tgButton.onclick = () => {
            // Використання об'єкта location
            window.location.href = "https://t.me/telegram"; 
        };
        footer.append(tgButton);
    }

    // 2. getElementById / querySelectorAll
    const aboutSection = document.getElementById("about"); // Шукаємо за ID
    const prices = document.querySelectorAll(".price");    // Шукаємо за класом

    // Додаємо стилі всім цінам (спрацює на сторінці Меню)
    prices.forEach(price => {
        price.classList.add("highlight-price");
    });

    // 3. innerHTML / textContent
    const promoBox = document.querySelector(".promo-box");
    if (promoBox) {
        // textContent - безпечна зміна тексту без тегів
        promoBox.textContent = "Доброго дня! Знижка 10% на перше замовлення!";
    }

    // 4. outerHTML
    const brandSpan = document.querySelector(".brand-name");
    if (brandSpan) {
        // outerHTML - повністю замінює сам тег <span> на <strong> з новим стилем
        brandSpan.outerHTML = "<strong class='brand-name' style='color: gold; font-size: 1.1em;'>Metropole Premium</strong>";
    }

    // 5. createElement + append
    const popularList = document.querySelector("ol"); 
    if (popularList) {
        const newDish = document.createElement("li");
        newDish.textContent = "Борщ з пампушками";
        // append - додає в самий кінець списку
        popularList.append(newDish);
    }

    // 6. prepend
    if (aboutSection) {
        const liveMusicNode = document.createElement("div");
        liveMusicNode.className = "live-music-alert";
        // innerHTML - дозволяє вставити рядок разом з HTML-тегами
        liveMusicNode.innerHTML = "🎵 <strong>Увага:</strong> Сьогодні жива музика о 19:00!";
        // prepend - вставляє на самий початок контейнера
        aboutSection.prepend(liveMusicNode);
    }

    // 7. after
    const mapContainer = document.querySelector(".map-container"); 
    if (mapContainer) {
        const parkingInfo = document.createElement("p");
        parkingInfo.textContent = "Для наших гостей працює безкоштовна парковка у дворі.";
        parkingInfo.style.textAlign = "center";
        parkingInfo.style.color = "var(--warm)";
        // after - вставляє елемент ПІСЛЯ вказаного блоку (не всередину нього)
        mapContainer.after(parkingInfo);
    }

    // 8. replaceWith
    // Шукаємо комірку, яка містить слово "Тірамісу"
    const tdElements = Array.from(document.querySelectorAll("td"));
    const tiramisuItem = tdElements.find(td => td.textContent.includes("Тірамісу"));
    
    if (tiramisuItem) {
        const outOfStock = document.createElement("td");
        outOfStock.textContent = "Тірамісу (Тимчасово відсутнє)";
        outOfStock.style.color = "red";
        outOfStock.style.textDecoration = "line-through";
        // replaceWith - замінює старий вузол на новий
        tiramisuItem.replaceWith(outOfStock);
    }

    // 9. remove
    if (promoBox) {
        setTimeout(() => {
            // remove - повністю видаляє елемент з HTML-дерева через 10 секунд
            promoBox.remove(); 
        }, 10000);
    }

    // 10. nodeValue / data
    const copyrightText = document.querySelector("footer p");
    if (copyrightText && copyrightText.firstChild) {
        // nodeValue звертається не до тегу <p>, а саме до текстового вузла всередині нього
        copyrightText.firstChild.nodeValue = `© Metropole ${new Date().getFullYear()} | Лабораторна робота`;
    }
});