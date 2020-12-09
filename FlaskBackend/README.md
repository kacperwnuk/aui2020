Backend

Jest wystawiony endpoint initialize do tworzenia bazy.

Wymagany dekorator cross_origin aby angular mógł strzelać.

Rejestrowanie użytkownika -> /register -> podajemy email i password

Logowanie -> /login  -> zwraca authorization_key który jest potrzebny do autoryzacji dla pozostałych endpointów które autoryzacji wymagają

Zmiany w views.py można dokonywać live na włączonym dockerze i widzieć zmiany.

Aby nie tracić info o bazie trzeba włączyć wolumen w docker-compose dla db. Jak się wprowadza dużo zmian w bazie to łatwiej bez volumenu.
Nie zrobiłem mechanizmu migracji.

Nie chciał mi działać dekorator który wywołuje metodę zanim pójdzie jakikolwiek call do api. TODO
