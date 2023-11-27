
var verb1;
var verb2;
var adjective1;
var adjective2;
var noun1;
var noun2;
var pronoun1;
var pronoun2;
var adverb1;
var adverb2;
var preposition1;
var preposition2;
var conjunction1;
var conjunction2;
var interjection1;
var interjection2;

function showStory1(){
    var x = document.getElementById("wordForm").elements;
    verb1 = x[0].value;
    verb2 = x[1].value;
    adjective1 = x[2].value;
    adjective2 = x[3].value;
    noun1 = x[4].value;
    noun2 = x[5].value;
    pronoun1 = x[6].value;
    pronoun2 = x[7].value;
    adverb1 = x[8].value;
    adverb2 = x[9].value;
    preposition1 = x[10].value;
    preposition2 = x[11].value;
    conjunction1 = x[12].value;
    conjunction2 = x[13].value;
    interjection1 = x[14].value;
    interjection2 = x[15].value;

    var story = ''+noun1+': the '+adjective1+' frontier. These are the voyages of the starship '+noun2+' '+conjunction2+' its crew, '+interjection2+'! Its five-year mission: to '+adverb1+' '+verb1+' '+adjective2+' new worlds, to '+verb2+' new life '+conjunction1+' new civilizations, to '+adverb2+' go '+preposition1+' where no man has gone before. '+interjection1+'!'
    document.getElementById("display").innerText = story;
}

function showStory2(){
    var x = document.getElementById("wordForm").elements;
    verb1 = x[0].value;
    verb2 = x[1].value;
    adjective1 = x[2].value;
    adjective2 = x[3].value;
    noun1 = x[4].value;
    noun2 = x[5].value;
    pronoun1 = x[6].value;
    pronoun2 = x[7].value;
    adverb1 = x[8].value;
    adverb2 = x[9].value;
    preposition1 = x[10].value;
    preposition2 = x[11].value;
    conjunction1 = x[12].value;
    conjunction2 = x[13].value;
    interjection1 = x[14].value;
    interjection2 = x[15].value;

    var story = ''+pronoun2+' '+adverb1+' choose to go to the '+noun1+' ,'+interjection2+'!,  in this decade '+conjunction1+' do the other things, not '+preposition2+' they are '+adjective1+', but '+preposition1+' they are '+adjective2+', because that goal will serve to '+verb1+' '+conjunction2+' measure the best of our energies and skills, because that '+noun2+' is one that we are willing to '+adverb2+' '+verb2+', one we are unwilling to postpone, and one which '+pronoun1+' intend to win. '+interjection1+'!'
    document.getElementById("display").innerText = story;
}

function resetForm(){
    document.getElementById("wordForm").reset();
    document.getElementById("display").innerText = '';
}