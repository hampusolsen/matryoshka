todo:

*) Support sort entries function (asc <-> desc by modified)

--------

Finish styling <ContentTable>
Convert folder name -> path navigator
Create <Checkbox> component
Create <EntryMenu> sub-component to <Entry>
Add logo to sidebar
Add user information and sign out option to sidebar
Create <HeaderSearchBar> sub-component to <Header>
Create <HeaderBreadcrumbs> sub-component to <Header>

********
Notes: 

autoFocus attribut på inputs

//////

to Andreas:

Hej Andreas, hoppas allt är bra med dig!


Skulle gärna vilja ha lite feedback/hjälp med mitt Dropbox-projekt...

https://github.com/hampusolsen/matryoshka

Mer specifikt undrar jag hur man hanterar sortering av lista av filobjekt!
Jag har fastnat lite.

Som du ser om du klonar ned repot så övergav jag tyvärr TypeScript; även om jag kunde få ihop en
fungerande App så var det alldeles för jobbigt att få det att lira med den funktionalitet jag vill ha med.
Däremot användar jag nu Redux och React Redux i den nya versionen!

Om du tittar på getCompareFunction() som finns på raderna 82 -> 103 i src/Components/Content/helpers.js
så returnerar jag som default case funktionen compareNone /* () => 0 */ för att min .sort() inte ska kunna
påverka renderingen av listan "entries" som jag mappar genom i src/Components/Content/ContentTable.js.

Enligt MDN:

"If compareFunction(a, b) returns 0, leave a and b unchanged with respect to each other, 
but sorted with respect to all different elements. Note: the ECMAscript standard does not guarantee 
this behavior, thus, not all browsers (e.g. Mozilla versions dating back to at least 2003) respect this."

Borde inte 

	entries
		.sort(() => 0)
		.map(...
		
då ge samma resultat som 

	entries
		.map(...
		
?

Just nu så när jag defaultar "sortingOptions" i ContentTable.js genom att klicka på föregående sorteringspreferens
så händer ingenting. Vilket är lite vad jag förstod .sort(() => 0) skulle göra, men föregående preferens
påverkar fortfarande "entries"...

Skulle vilja att "entries" i stället återställdes till hur listan såg ut när sidan först laddades in.

Sen har jag även någon bug om man först sorterar med Name, Descending och sedan går över till Modified, descending
som jag inte heller förstår mig på.

Ursäktar för textväggen, men hoppas det är hyffsat klart vad jag försöker göra!


