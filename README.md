# AUI 2020 - aplikacja do zbierania i wizualizacji pomiarów

Składowe projektu:
1. Restowy serwer - Python/Flask
2. Baza danych - PostgreSQL
3. Wizualizacja - Grafana
4. Aplikacja kliencka www - do ustalenia Vue/Angular/React


## Uruchamianie projektu
Składowe są skonteneryzowane. 

Zbudowanie projektu - `docker-compose build`

Uruchomienie projektu - `docker-compose up`

Zamknięcie - `docker-compose down`

W przypadku zmian w plikach dockerowych [Dockerfile, docker-compose.yml] konieczne przebudowanie.


### Informacje dodatkowe
Umożliwione zostało aktualizowanie kodu serwera podczas działania kontenera tzn.
zmiany w kodzie będą widoczne w skonteneryzowanej aplikacji w celu ułatwienie prac deweloperskich.

Baza danych oraz aplikacja do wizualizacji posiadają wolumeny w celu zachowania danych pomimo zamknięcia kontenerów.
