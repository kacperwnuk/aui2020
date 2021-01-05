Backend

Jest wystawiony endpoint initialize do tworzenia bazy.

Wymagany dekorator cross_origin aby angular mógł strzelać.

Zmiany w views.py można dokonywać live na włączonym dockerze i widzieć zmiany.

Aby nie tracić info o bazie trzeba włączyć wolumen w docker-compose dla db. Jak się wprowadza dużo zmian w bazie to łatwiej bez volumenu.
Nie zrobiłem mechanizmu migracji.

Nie chciał mi działać dekorator który wywołuje metodę zanim pójdzie jakikolwiek call do api. TODO


Endpointy:

/register -> Post z body {"email": "", "password": ""}

/login -> Post z body {"email": "", "password": ""}

odpowiedź po logowaniu udanym
{
    "meta": {
        "code": 200
    },
    "response": {
        "user": {
            "authentication_token": "WyIyIiwiJDUkcm91bmRzPTUzNTAwMCRWWjF6REtxOHVuRVdSZmxqJFlZVlBranNZSVZTdlU0TEZmZXkuQmZkSUc2MGNITUZxY2xmV2xtU0VhSDgiXQ.X_R_Fg.nOVogOkpNw07hUilUgeGG6C-5aE",
            "id": "2"
        }
    }
}

dalsze zapytania:
requests.get("http://localhost:5000/hello", headers={"Authentication-Token": "WyI3IiwiJDUkcm91bmRzPTUzNTAwMCRLUFR6REkySGZ3NTR5YXpRJDd0OU82VzNNdE5JWU5GZnBVOVFjdjZjMktFRHlwSW1XUkV2OXhxRU80Ui4iXQ.X8wGdA.bY8MJMAqCfiDGCDByEcfBFfGusA"})

/disconnect wylogowanie

/hello przykładowa strona do testu