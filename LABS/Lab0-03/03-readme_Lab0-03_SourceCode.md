# IBM Node-RED IBM Cloud template 2020. Запуск локально

# LAB-0-02 - getting source code


<!-- TOC BEGIN -->
- 1 [Вступ](#p1)

- 2 [Призначення каталогів](#p2)

- 3 [Призначення файлів в кореневому каталозі](#p3)

- 4 [Запуск нашого app локально з Node.Js під локальною ОС](#p4)

- 5 [Запуск нашого app локально в контейнері](#p5)

- 6 [ Анатомія локального запуску](#p6) 

- 7 [Deployent з допомогою IBM Cloud CLI](#p7) 



## Вступ

Документація написана з використанням загадльно-прийнятого формату markdown (файли  типу *.md). Короткий довідник по markdown знаходиться по лінку [markdown help](https://gist.github.com/MinhasKamal/7fdebb7c424d23149140).

Лабораторні роботи розраховані на роботу з OS windows-10

<a name="p2"></a>
## Призначення каталогів

- **defaults**
Тут розміщуєтья файл з наперед розробленими потоками обробки
з найменуванням **flow.json**. Якщо маємо кореспондуючий файл з credentials, то їх розміщують ту же в файлі **flow_cred.json**.
defaults/readme.md

- **nodes**
Тут розміщуються власні додаткові вузли обробки  
Щоб додати додаткові вузли потрібно:
  - скопіювати їх в цей каталог та додати їх залежності в **../package.json**
  - додати їх  **npm package name** в  **../package.json**
nodes/readme.md

- **public**
Тут знаходиться головна запускаюча сторінка додатку. Основні файли:
   - first-run.html - діалог першого запуску
   - index.html - відома червона сторінка Node-RED

- **routers**
Тут знаходиться звичайний node.js-express роутер, що виористовується для контролю живучості app. Використовується при запуску в kubernetes та OpenShift.

```js
const express = require('express');
module.exports = function (app) {
  const router = express.Router();
  router.get('/', function (req, res, next) {
    res.json({
      status: 'UP'
    });
  });
  app.use('/health', router);
}
```

- **server**
    Тут можна розмістити додаткові сервіси та класи. Також, тут є вкладений каталог **config**
    - **config**  
    в ньому розміщується конфігураційни файл **/config/mappings.json**, в якому прописується правила доступу до env variables, через які виконується зв'язування з іншими сервісами.
    Також, при необхідності підкладається файл **server/localdev-config.json** в якому зберігаються credentials при запуску на локальній станції. Цей файл стоїть в .gitingore і не повинен попадатив  SourceControl.
    
    **server/localdev-config.json**
    ```json
      {
        "cloudant_apikey": "xu9KREDF",
        "cloudant_host": "xxxx-bluemix.cloudantnosqldb.appdomain.cloud",
        "cloudant_iam_apikey_description": "Auto-generated for key a659120d",
        "cloudant_iam_apikey_name": "153348d7",
        "cloudant_iam_role_crn": "crn:v1:bluemix:public:iam",
        "cloudant_iam_serviceid_crn": "crn:v1:bluemm-ideserviceid:ServiceId",
        "cloudant_password": "a4e74b446d0e9d17a998902035cbf24",
        "cloudant_port": 443,
        "cloudant_url": "https://user:token@xxx-bluemix.cloudantnosqldb.appdomain.cloud",
        "cloudant_username": "user"
      }
    ```

  Приклад опису досупу з файлу  **/config/mappings.json**
  для реквізиту **cloudant_url**
   ```json
      "cloudant_url": {
        "searchPatterns": [
          "user-provided:node-red-app-cloudant-1580722484242-67617:url",
          "cloudfoundry:$['cloudantNoSQLDB'][0].credentials.url",
          "env:service_cloudant:$.url",
          "env:cloudant_url",
          "file:/server/localdev-config.json:$.cloudant_url"
        ]
      }
  ```
Доступ з файла: "file:/server/localdev-config.json:$.cloudant_url
В хмарі CloudFoundry параметр вичитується з "cloudfoundry:$['cloudantNoSQLDB'][0].credentials.url"

<a name="p3"></a>
## Призначення файлів в кореневому каталозі

- **package.json**

Основний файл з реестром node.js пакетів та бібліотек. Наповнюється через npm install

- **bluemix-settings.js**
Модуль в якому вичитуються конфігурації додатку.
порти, папаметри cloudant. До нього звертається **index.js** при старті

- **index.js**
Головний файл, являє собою звичайний Node.js express сервер.

- **cloudantStorage.js**
Модуль роботи з базою даних Cloudant

- **.cfignore**
Файл відноситься до CloudFoundry deployment. Це список файлів та какалогів які ігноруються при deployment в cloudfoundry.

- **manifest.yml**
Конфігурація cloudFoundry application при deployment.

- **cli-config.yml**
Конфігурація ibmCloud CLI. До речі дуже цікавий файл. Потрібно з ним розібратися детальніше.

- **run-debug**
Для запуску в режимі remote debug
(не працює, здається переїхав з минулої вресії node.js app шаблону).
Дуже схоже, що зараз його функції виконує **cli-config.yml**

- **run-dev**
Для запуску в режимі розроника
(не працює, здається переїхав з минулої вресії node.js app шаблону). Дуже схоже, що зараз його функції виконує **cli-config.yml** 

- **README.md**
описовий

- **CONTRIBUTING.md**
описовий

- **DCO1.1.txt**
описовий

- **LICENSE**
описовий


<a name="p4"></a>
## Запуск нашого app локально:

Існує 2 варианту запуску нашого app локально
- традиційний і класичний спосіб, використовуючи команду

```bash

   npm install

   npm start

```

Цей скрипт запускає команду:

```bash
  node --max-old-space-size=160 index.js --settings ./bluemix-settings.js -v
```
При цьому application буде доступне по http://localhost:1880/


<a name="p5"></a>
## Запуск нашого app локально в Docker контейнері

Запуск в docker контенері ділиться на 2 етапи
Спершу створюється образ операційного середовища, описаний в файлі: Dockerfile-tools 
Потім уже створюється новий образ шляхом копіювання app кода. Взято від шаблону звичайного node.js app

**Побудова базовго образа**
(чомусь перестало працювати. Є підозра в сумісності версій Node)

```bash
  ibmcloud dev build
```

**Створюється контейнер з прикладним кодом**

```bash
  ibmcloud dev run
```

В каталозі from-rhat-img  дежать Docker файлы для запуска контейнерів та образи від RHat
В каталозі from-rhat-img  Docker файли з node:10-stretch

Якщо команди не спрацьовують, то дають таку помилку 

```bash
Logs for the nodredwshp-express-run container:

> node-red-app@1.1.1 start /app
> node --max-old-space-size=160 index.js --settings ./bluemix-settings.js -v
internal/modules/cjs/loader.js:1021
  return process.dlopen(module, path.toNamespacedPath(filename));
                 ^Error: /app/node_modules/bcrypt/lib/binding/bcrypt_lib.node: invalid ELF header
```

то можна використати прямі докер команди

```
    ## similar Dockerfile-tools
    docker image build --file Dockerfile-tools --tag nodredwshp-express-tools --rm --pull --build-arg bx_dev_userid=0 --build-arg bx_dev_user=root .

   ## similar Dockerfile
   docker image build --file Dockerfile --tag nodredwshp-express-run --rm --pull --build-arg bx_dev_userid=0 --build-arg bx_dev_user=root .

   ## run container
   docker run -p 1880:1880б -p3000:3000 nodredwshp-express-run

```

<a name="p6"></a>
## Анатомія локального запуску 

Якщо Node-RED стартує локально, то сворює каталог

```bash
   .node-red
```

Щоб не передавати його в контейнер та git цей каталог потрібно додати в  так звані ignore-файли. Приклади файлів показані в
**.gitignore**, **.dockerignore**, **.cfignore**.





<a name="p7"></a>
## Deployent з допомогою IBM Cloud CLI

<kbd><img src="doc/lab-02-pic6.png"/></kbd>

<kbd><img src="doc/lab-02-pic7.png"/></kbd>


