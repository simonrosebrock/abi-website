
![Logo](https://github.com/simonrosebrock/abi-website/blob/main/public/logo.png)


# Abi Website

Die Abi-Website ist eine zentrale Plattform, auf der wichtige Termine eingetragen, Mottos und Finanzübersichten eingesehen sowie Fotos hochgeladen werden können – alles, was für eine erfolgreiche Organisation des Abiturs benötigt wird.


## Features


Benutzerseite:
- Termine einsehen und sich als Teilnehmer eintragen
- Vorschläge hinzufügen
- Mottos einsehen
- Finanzübersicht anzeigen
- Fotos hochladen (werden nach Verifizierung angezeigt)

Adminseite:
- Zugriff nur für Admin-Account
- Alle Features an/ausschalten
- Benutzerkonten verwalten
- Termine bearbeiten, hinzufügen und verwalten
- Kategorien für Vorschläge verwalten, einzelne Vorschläge verwalten
- Mottos aktualisieren, eintragen und verwalten
- Finanzübersicht bearbeiten, eintragen und verwalten
- Fotos verwalten

Allgemein:
- Übersichtliche Darstellung von wichtigen Abiturinformationen
- Homepage zur Anzeige des Abimottos und der Mottowoche

## Preview

Homepage:

![HomepagePreview](https://github.com/simonrosebrock/abi-website/blob/main/public/HomepagePreview.png)

Userside:

![UserPreview](https://github.com/simonrosebrock/abi-website/blob/main/public/UserPreview.png)

Adminside:

![AdminPreview](https://github.com/simonrosebrock/abi-website/blob/main/public/AdminPreview.png)
# Deployment

Repository klonen:

```
git clone https://github.com/simonrosebrock/abi-website
```

Git-Ordner löschen:

```
cd abi-website
rmdir /s /q .git
```

Gehe auf GitHub und erstelle ein neues privates Repository (verwende nur Kleinbuchstaben):

```
git init
git remote add origin https://github.com/<BENUTZERNAME>/<REPOSITORY-NAME>.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

Vercel einrichten:
- Gehe zu [Vercel](https://vercel.com) und melde dich an.
- Klicke auf "Add New", wähle "Project" aus, wähle dein GitHub-Repository aus und klicke auf "Import".
- Klicke auf "Deploy" und sofort danach auf "Cancel Deployment".

Datenbanken einrichten:
- Gehe zurück zu [Vercel](https://vercel.com) und öffne dein Projekt.
- Im Dashboard deines Projekts klicke auf "Storage", dann auf "Create Database" und wähle Neon (PostgreSQL DB) aus.
- Klicke dich durch die Einrichtung, bis die Datenbank mit deinem Projekt verbunden ist.
- Gehe erneut in dein Projekt, klicke auf "Storage" und erstelle eine neue Datenbank, wähle diesmal "Blob" aus.
- Klicke dich wieder durch die Einrichtung, bis auch diese Datenbank verbunden ist.
- Im Storage-Dashboard für die Blob DB klicke unten auf "Settings" und kopiere die Adresse, die ähnlich wie folgt aussieht:
```
unhqdt5ayffgdz1u.public.blob.vercel-storage.com
```
- Gehe nun in dein lokales Projekt und öffne die Datei `next.config.mjs`. Ersetze die alte Adresse mit der kopierten Adresse.

Datenbank befüllen:
- Gehe zu deiner Neon PostgreSQL-Datenbank und kopiere die `.env.local`.
- Füge diese Datei in deinem lokalen Projekt hinzu.
- Führe den folgenden Befehl aus:

```
npm run setup-db
```

Admin-Account erstellen:
- Gehe zu [uuid_generator](https://www.uuidgenerator.net/version4), erstelle eine UUID und speichere sie.
- Gehe in deinem Vercel-Projekt auf "Settings".
- Klicke auf "Environment Variables" und füge folgende Variablen unter "Key" und "Value" ein:

| Key          | Value         |
| ------------ | ------------- |
| ADMIN_TOKEN  | <deine-uuid>  |
| ADMIN_PW     | <dein-passwort> |

### Images-Feature einrichten:

**Image-Server einrichten:**

Repo auf deinem Server klonen:

```
git clone https://github.com/simonrosebrock/image-server
```

Erstelle eine Datei namens `.env` und füge einen selbst gewählten API-Key hinzu:

```
API_KEY="<dein-key-hier>"
```

Installiere Node.js auf deinem Server:

```
sudo apt update
sudo apt install nodejs npm
```

Installiere die benötigten Pakete, führe den Befehl im Projektverzeichnis aus:

```
npm install
```

Server starten:

```
node server.js
```

Konfiguriere Port-Forwarding für den Server auf Port 4000.

Wenn der Server lokal läuft, richte ein Dynamic DNS ein und merke dir die Domain.

**Image-Proxy einrichten:**

Repo lokal klonen und danach hochladen:

```
git clone https://github.com/simonrosebrock/image-proxy
```

Gehe auf GitHub und erstelle ein neues privates Repository (verwende nur Kleinbuchstaben).

Neues Repository initialisieren:

```
git init
git remote add origin https://github.com/<BENUTZERNAME>/<REPOSITORY-NAME>.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

**Cloudflare:**
- Erstelle ein Konto bei Cloudflare und melde dich an.
- Gehe zu "Workers und Pages" und klicke auf "Erstellen".
- Verbinde dein GitHub und wähle das gerade erstellte Image-Proxy-Repository aus.
- Im Dashboard des Image-Proxy gehst du auf "Einstellungen".
- Speichere unter "Domains und Routen" die Domain bei workers.dev (wird später benötigt).
- Gehe zu "Variablen und geheime Schlüssel" und klicke auf "Hinzufügen".
- Füge folgende Werte ein und ersetze alle Werte in <>:

| Variablenname | Wert                        |
| ------------- | --------------------------- |
| SERVER_URL    | http://<domain>:4000        |
| API_KEY       | <dein-key>                  |
| ADMIN_TOKEN   | <admin-token>               |
| DB_URL        | <connection-string>         |

Gehe in deinem lokal gespeicherten Projekt zu `next.config.mjs` und ersetze die Adresse `image-proxy.simon-rosebrock.workers.dev` mit deiner kopierten Adresse.

**Images und Vercel verbinden:**
- Gehe in dein Vercel-Projekt auf "Settings".
- Klicke auf "Environment Variables" und füge folgende Variablen unter "Key" und "Value" ein:

| Key          | Value                          |
| ------------ | ------------------------------ |
| SERVER_URL   | http://<image-server-domain>    |
| API_KEY      | <image-server-api-key>         |
| PROXY_URL    | http://<image-proxy-domain>     |