<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Noname</title>
    <link rel="stylesheet" href="noname.css">
    <script type="text/javascript" src="jquery-3.5.1.js"></script>
</head>
<body>
<div id="global">
    <div id="verticalTabs">
        <div id="profilTab">
            <img src="assets/icones/profil.png" alt="Icone du profil" title="Profil du joueur" />
        </div>
        <div id="invTab">
            <img src="assets/icones/inv.png" alt="Icone de l'inventaire" title="Inventaire du joueur" />
        </div>
        <div id="settingsTab">
            <img src="assets/icones/settings.png" alt="Icone des paramètres" title="Paramètres de la partie" />
        </div>
    </div>
    <div id="center">
        <div id="resourcesTab"></div>
        <div id="game"></div>
        <div id="horizontalTabs">
            <div id="gatherTab">
                <img src="assets/icones/gather.png" alt="Icone des récoltes" title="Fenêtre des récoltes" />
            </div>
            <div id="craftTab">
                <img src="assets/icones/craft.png" alt="Icone des crafts" title="Fenêtre des crafts" />
            </div>
            <div id="fightTab">
                <img src="assets/icones/fight.jpg" alt="Icone des combats" title="Fenêtre des combats" />
            </div>
            <div id="shopTab">
                <img src="assets/icones/shop.png" alt="Icone du shop" title="Fenêtre du shop" />
            </div>
        </div>
    </div>
</div>
<script type="module">
    import {setAccueilWindow} from './noname.js';
    setAccueilWindow($('#game'));
</script>
</body>
</html>