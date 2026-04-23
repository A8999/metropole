
function bookingDialogue() {
    let count;
    while (true) {
        count = prompt("На скільки осіб ви бажаєте забронювати столик? (Введіть число)", "2");
        if (count !== null && count > 0 && !isNaN(count)) break;
        alert("Будь ласка, введіть коректне число осіб.");
    }

    if (count <= 2) {
        alert("Чудово! Для " + count + " осіб ми пропонуємо затишний столик біля вікна.");
    } else if (count <= 5) {
        alert("Для вашої компанії з " + count + " осіб ми підготували комфортний стіл у центрі зали.");
    } else {
        alert("Вас " + count + " осіб! Ми запропонуємо вам наш просторий VIP-зал.");
    }
}

function showDevInfo(lastName, firstName, position ) {
    console.log("--- Інформація про розробника ---");
    console.log("Прізвище: " + lastName);
    console.log("Ім'я: " + firstName);
    console.log("Посада: " + position);
    alert(`Розробник: ${lastName} ${firstName}\nПосада: ${position}`);
}

function compareDishes(str1, str2) {
    if (str1.length > str2.length) {
        alert("Довша назва: " + str1);
    } else if (str2.length > str1.length) {
        alert("Довша назва: " + str2);
    } else {
        alert("Назви страв мають однакову довжину.");
    }
}

//bookingDialogue(); 

//showDevInfo("A8999", "Ssss"); 

//compareDishes("Стейк з перцевим соусом", "Тірамісу");

document.addEventListener("DOMContentLoaded", () => {
    
    const footer = document.querySelector("footer");
    if (footer) {
        const tgButton = document.createElement("button");
        tgButton.textContent = "Бронь через Telegram";
        tgButton.style.cssText = "margin-left: 15px; padding: 5px 15px; background: var(--warm); border: none; border-radius: 5px; cursor: pointer; color: #fff;";
        
        tgButton.onclick = () => {
            window.location.href = "https://t.me/telegram"; 
        };
        footer.append(tgButton);
    }

    const aboutSection = document.getElementById("about");
    const prices = document.querySelectorAll(".price");
    
    prices.forEach(price => {
        price.classList.add("highlight-price");
    });

    const promoBox = document.querySelector(".promo-box");
    if (promoBox) {
        promoBox.textContent = "Доброго дня! Знижка 10% на перше замовлення!";
    }

    const brandSpan = document.querySelector(".brand-name");
    if (brandSpan) {
        brandSpan.outerHTML = "<strong class='brand-name' style='color: gold; font-size: 1.1em;'>Metropole Premium</strong>";
    }

    const popularList = document.querySelector("ol"); 
    if (popularList) {
        const newDish = document.createElement("li");
        newDish.textContent = "Борщ з пампушками";
        popularList.append(newDish);
    }

    if (aboutSection) {
        const liveMusicNode = document.createElement("div");
        liveMusicNode.className = "live-music-alert";
        liveMusicNode.innerHTML = "<strong>Увага:</strong> Сьогодні жива музика о 19:00!";
        aboutSection.prepend(liveMusicNode);
    }

    const mapContainer = document.querySelector(".map-container"); 
    if (mapContainer) {
        const parkingInfo = document.createElement("p");
        parkingInfo.textContent = "Для наших гостей працює безкоштовна парковка у дворі.";
        parkingInfo.style.textAlign = "center";
        parkingInfo.style.color = "var(--warm)";
        mapContainer.after(parkingInfo);
    }

    const tdElements = Array.from(document.querySelectorAll("td"));
    const tiramisuItem = tdElements.find(td => td.textContent.includes("Тірамісу"));
    
    if (tiramisuItem) {
        const outOfStock = document.createElement("td");
        outOfStock.textContent = "Тірамісу (Тимчасово відсутнє)";
        outOfStock.style.color = "red";
        outOfStock.style.textDecoration = "line-through";
        tiramisuItem.replaceWith(outOfStock);
    }

    if (promoBox) {
        setTimeout(() => {
            promoBox.remove(); 
        }, 10000);
    }

});

// =======================================================
// ЛАБОРАТОРНА РОБОТА: ПОДІЇ ТА ДЕЛЕГУВАННЯ
// =======================================================

// ЗАВДАННЯ 1: ПОДІЇ МИШІ ТА ОБРОБНИКИ
// 1.1. Обробник через атрибут (викликається з HTML: onclick="inlineLogoClick()")
function inlineLogoClick() {
    console.log("Клік по лого атрибут");
}

const logo = document.getElementById("main-logo");
if (logo) {
    // 1.2. Призначення обробника через властивість
    logo.onmouseenter = function() {
        console.log("Наведено мишу властивість");
    };

    // 1.3. Використання addEventListener (різні обробники на одну подію)
    const handlerOne = () => console.log("Обробник атрибут");
    const handlerTwo = () => console.log("Обробник властивість");
    
    logo.addEventListener("click", handlerOne);
    logo.addEventListener("click", handlerTwo);

    // 1.4. Об'єкт як обробник події (метод handleEvent) + event.currentTarget
    const logoObjectHandler = {
        handleEvent(event) {
            console.log(`ЗАВДАННЯ 1: Об'єкт-обробник спрацював на подію: ${event.type}`);
            console.log("Елемент (currentTarget):", event.currentTarget);
            // Змінюємо колір логотипа при подвійному кліку
            event.currentTarget.style.color = "gold";
        }
    };
    
    // Призначаємо об'єкт на подію "dblclick" (подвійний клік)
    logo.addEventListener("dblclick", logoObjectHandler);

    // 1.5. Видалення об'єкта-обробника через removeEventListener
    const removeBtn = document.getElementById("remove-listener-btn");
    if (removeBtn) {
        removeBtn.addEventListener("click", () => {
            logo.removeEventListener("dblclick", logoObjectHandler);
            logo.style.color = ""; // Скидаємо колір
            alert("Об'єкт-обробник подвійного кліку видалено!");
        });
    }
}


// ЗАВДАННЯ 2: ДЕЛЕГУВАННЯ ТА ПОВЕДІНКА
// 2.1. Делегування подій на списку (підсвічування)
const popList = document.getElementById("popular-dishes-list");
if (popList) {
    // Вішаємо ОДИН обробник на весь <ol>, а не на кожен <li>
    popList.addEventListener("click", function(event) {
        // Перевіряємо, чи клік був саме по тегу LI
        if (event.target.tagName === "LI") {
            // Знімаємо клас у всіх дочірніх елементів (скидаємо попередній вибір)
            Array.from(popList.children).forEach(li => li.classList.remove("selected-item"));
            // Додаємо клас підсвічування елементу, по якому клікнули (event.target)
            event.target.classList.add("selected-item");
        }
    });
}

// 2.2. Меню кнопок та один обробник через data-* атрибути
const tableControls = document.getElementById("table-controls");
if (tableControls) {
    // Об'єкт з методами, які відповідають значенням data-action
    const menuActions = {
        hidePrices() {
            document.querySelectorAll(".price").forEach(p => p.style.opacity = "0");
        },
        showPrices() {
            document.querySelectorAll(".price").forEach(p => p.style.opacity = "1");
        }
    };

    // Делегування на контейнер з кнопками
    tableControls.addEventListener("click", (event) => {
        const actionName = event.target.dataset.action; // Зчитуємо data-action
        if (actionName && menuActions[actionName]) {
            menuActions[actionName](); // Викликаємо відповідний метод
        }
    });
}

// 2.3. Патерн "Поведінка" (Behavior) через data-behavior
document.addEventListener("click", (event) => {
    const element = event.target;
    // Якщо у елемента, по якому клікнули, є атрибут data-behavior="counter"
    if (element.dataset.behavior === "counter") {
        let clicks = parseInt(element.dataset.clicks); // Зчитуємо поточне значення
        clicks++;                                      // Збільшуємо
        element.dataset.clicks = clicks;               // Записуємо назад в атрибут
        element.textContent = `Кліків: ${clicks}`;     // Оновлюємо текст
    }
});