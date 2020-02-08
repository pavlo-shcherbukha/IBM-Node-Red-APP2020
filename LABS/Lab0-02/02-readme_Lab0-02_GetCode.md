# IBM Node-RED IBM Cloud template 2020. Getting source code

# LAB-0-02 - getting source code


<!-- TOC BEGIN -->
- 1 [Вступ](#p1)

- 2 [Робота з IBM Cloud git. знайти URL git-репозиторію](#p2)

- 3 [Робота з IBM Cloud git. Згенеруати необхідні credentials](#p3)

- 4 [Робота з IBM Cloud git. Клонування репозиторію на локальну станцію](#p4)

- 5 [Робота з IBM Cloud git. Додаткові настройки Git](#p5)

- 6 [Робота з IBM Cloud git. Змінити код та відпавити його знову в IBM Cloud](#p6) 

- 7 [Встановлення IBM Cloud CLI](#p7) 

<!-- TOC END -->

<a name="p1"></a>
## Вступ

Документація написана з використанням загадльно-прийнятого формату markdown (файли  типу *.md). Короткий довідник по markdown знаходиться по лінку [markdown help](https://gist.github.com/MinhasKamal/7fdebb7c424d23149140).

Лабораторні роботи розраховані на роботу з OS windows-10

В IBM Cloud уже збережено програмний код. Для його отримання потрібно:
- знайти URL git-репозиторію
- згенеруати необхідні credentials
- клонувати git-репозиторій на робочу станцію
- відкрити висхідний код в Visual Code Studio

<a name="p2"></a>
## Робота з IBM Cloud git. знайти URL git-репозиторію

 - Спершу в IBM Cloud знаходимо наш додаток те переходимо в його deployment toolchain. Детально кроки показані на малюнку:
<kbd><img src="doc/lab-02-pic6.png"/></kbd>

- В результаті виконання цих кроків попадаємо в deployment toolcain
<kbd><img src="doc/lab-02-pic7.png"/></kbd>

- Шляхом кліку на іконці Git (відмічена червоним), попадаємо в git-repo IBM-Cloud
<kbd><img src="doc/lab-02-pic8.png"/></kbd>

На цьому скріншоті ми можемо бачити, що це звичайний git - репозиторій, що нічим не відрізняється від github чи github.

Для роботи з remote репозиторієм потрібно:

- отримати http url репозиторію для колнування. 
На цьому скріншоті показано як знайти URL  для клонування 
<kbd><img src="doc/lab-02-pic9.png"/></kbd>

Але потрібно мати на увазі, що цей URL буде модифікований credantials. Як отримати credentials - читаємо в наступних пунктах


<a name="p3"></a>
## Робота з IBM Cloud git. Згенеруати необхідні credentials

Сredentials для автоматичного доступу до репозиторію складаються з git username та git token

Процес генерації токена показаний на скріншоті
<kbd><img src="doc/lab-02-pic10.png"/></kbd>

А git username показаній на малюнку у правому верхньому куті біля знака "@" **Pavlo.Shcherbukha**

Згенерований токен потрібно зберегти, в наступному розділі він буде підставлятися в URL.

<a name="p4"></a>
## Робота з IBM Cloud git. Клонування репозиторію на локальну станцію

Для клонування порібно стоврити каталого, на приклад Lab0-02-app
Клонування виконується командою:

```bash
   git clone [url-repo] -b master [path] , де
```

*  [url-repo] - url репозиторію має таку структуру
     https://git-username:git-token@url

* -b master - вказує на branch, з якого потрібо зробити клон, в нашому випадку master
* [path] - повний шлях до репозиторію, але через слеш /

Приклад:
```text
git username: Pavlo.Shcherbukha
git token: ueze47G34YEowL5ft5c5
git url repo: https://eu-gb.git.cloud.ibm.com/Pavlo.Shcherbukha/nod-red-wshp.git
```

clone url with credentials:

```text
https://Pavlo.Shcherbukha:ueze47G34YEowL5ft5c5@eu-gb.git.cloud.ibm.com/Pavlo.Shcherbukha/nod-red-wshp.git
```

В результаті клонування отримаємо щось схоже на це:
<kbd><img src="doc/lab-02-pic12.png"/></kbd>

<a name="p5"></a>
## Робота з IBM Cloud git. Додаткові настройки Git

Для повноти настройки бажано прописати в локальному git ваш логин та e-mail, ті ж самі, що і в локальному репозиторії 

```bash
    git config user.name "Pavlo.Shcherbukha"
    git config user.email "Pavlo.Shcherbukha@ua.ibm.com"
```
Результат конфігурації можна попачити, винонавши команду:

```bash
  git config --local --list
```
Команда поверне, щось схоже на це:
<kbd><img src="doc/lab-02-pic11.png"/></kbd>



<a name="p6"></a>
## Робота з IBM Cloud git. Змінити код та відпавити його знову в IBM Cloud 

На цьому етапі зробимо невеликі зміни в отриманому коді. Наприклад в файлі readme.md додамо рядок з текстом:

```text
   TEST UPLOAD
```
потім, відправимо код в репозиторій. Це викличе перебудову всього хмарного додатку. Це буде приклад тестового deployment.
Тож, 
- Міняємо readme.md

- Додаємо файл під контроль git

```bash
    git add README.md
      or
    git add *.*
```

- Виконуємо commit в локальний репозиторій командою:

```bash
   git commit -m "test deployment"
```

- Відправляємо зміни в хмарний репозиторій командою:

```bash
   git push
```

- Захрдимо в Delivery pipeline
Тут видно як зразу запуствся deployment нашого додатку.
<kbd><img src="doc/lab-02-pic13.png"/></kbd>




<a name="p7"></a>
## Встановлення IBM Cloud CLI  
 
