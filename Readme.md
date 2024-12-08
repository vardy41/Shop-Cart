# Mały projekt logiki sklepu

---

## Opis

Prosta logika obsługi koszyka, produktu w koszyku oraz rabatów
Stworzona za pomocą TypeScripta oraz przetestowana za pomocą Jest

Użyte technologie:

- Typescript
- Jest

### Klasy Discount i Product

Są to patterny produktu oraz rabatu

### Klasa Discounts

Obsługuję logike rabatów w oparciu korzystając z klasy Discount

### Klasa CartItem

Jest to klasa, która symuluje obsługę produktu znajdującego się w koszyku przy użyciu klasy Product

### Klasa Cart

Jej zadaniem jest przechowywanie produktów w tym przypadku klasy CartItem , posiada metody dodawania produktów do koszyka, dodawania rabatu na cały koszyk a także wyświetla dane takie jak calkowity koszt, zaoszczedzone pieniadze (w przypadku gdy mamy rabat)

## Ważne

Kod miejscami może wymagać uporządkowania, niektóre walidacje są pisane z "palca" a powinny byc importowane z pliku Validators.ts , który został stworzony do przechowywania walidacji oraz ich użycia gdy jest to potrzebne
