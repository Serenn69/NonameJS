// Variables globales pour la fenêtre active
let windows = {"accueilWindow": 0, "gatherWindow": 0, "craftWindow": 0, "fightWindow": 0, "shopWindow": 0};

// Variables des différents crafts et ressources
import {weapons, armors, ressources, ressourcesInv} from './data/globalVars.js';

// Fenêtre d'accueil
export function setAccueilWindow(window) {
    clearCurrentWindow(window);
    windows["accueilWindow"] = 1;
    window.append("<div id='accueilBackDiv'></div>");
    $('#accueilBackDiv').append("<p>Welcome to</p><br/><p>Noname !</p>");

    let ind = 0;
    $('#resourcesTab').append("<table><tr class='firstRow'></tr><tr class='secondRow'></tr>");
    for (let key in ressourcesInv) {
        let keyLow = key.toLowerCase().replace(/[éèê]/g,"e");
        let keyMaj = keyLow.replace(keyLow.charAt(0),keyLow.charAt(0).toUpperCase());
        ind++;
        if (ind < 15) $('.firstRow').append("<td><img src='assets/resources/"+keyLow+".png' alt='"+key+"' title='"+key+"' /></td><td><input type='text' id='inv"+keyMaj+"' name='keyLow' value='"+ressourcesInv[key]+"' readonly></td>");
        else $('.secondRow').append("<td><img src='assets/resources/"+keyLow+".png' alt='"+key+"' title='"+key+"' /></td><td><input type='text' id='inv"+keyMaj+"' name='keyLow' value='"+ressourcesInv[key]+"' readonly></td>");
    }

    $('#gatherTab, #craftTab, #fightTab, #shopTab').click(function () {
        let tab = $(this).attr("id").replace("Tab", "Window");
        if (windows[tab] !== 1) {
            if (tab == "gatherWindow") setGatherWindow($('#game'));
            else if (tab == "craftWindow") setCraftWindow($('#game'));
            else if (tab == "fightWindow") setFightWindow($('#game'));
            else if (tab == "shopWindow") setShopWindow($('#game'));
        }
    });
}

// Fenêtre de récolte
function setGatherWindow(window) {
    clearCurrentWindow(window);
    windows["gatherWindow"] = 1;
    $('#gatherTab').css({backgroundImage: "url('assets/background/stone2.png')", backgroundSize: "800px"});
    window.append("<div id='gatherBackDiv'></div>", "<div id='gatherUpgradeDiv'></div>");
    $('#gatherUpgradeDiv').append("<div id='upgradeMetalDiv'></div>", "<div id='upgradeBoisDiv'></div>");

    let upgrades = ["Metal", "Bois"];
    for (let i = 0; i < upgrades.length; i++) {
        for (let key in ressources[upgrades[i]]) {
            let qteUp = ressources[upgrades[i]][key]["qteUp"];
            let vitUp = ressources[upgrades[i]][key]["vitUp"];
            let cout = ressources[upgrades[i]][key]["cout"];
            $('#upgrade' + upgrades[i] + 'Div').append("<tr><td>" + key + "</td><td> : <input type='text' value='0' id='qty" + key + "' name='qty' style='width: 20px' readonly /></td><td>&nbsp;par&nbsp;</td><td class='last" + key + "'><input type='text' value='0' id='rate" + key + "' style='width: 20px' readonly /> min.</td>");
            if (ressources[upgrades[i]][key]["qteUp"] != 0) $('.last' + key).after("<td><span data-descr='" + cout[qteUp] + "g pour augmenter la quantite.'><input type='button' class='qteBtn' name='qte" + upgrades[i] + "/" + key + "' value='Aug. qté' /></span></td><td><span data-descr='" + cout[vitUp] + "g pour augmenter la vitesse.'><input type='button' class='vitBtn' name='vit" + upgrades[i] + "/" + key + "' value='Aug. vit' /></span></td></tr>");
            else $('.last' + key).after("<td><span data-descr='" + cout[qteUp] + "g pour debloquer.'><input type='button' name='" + upgrades[i] + "/" + key + "' class='deblockBtn' value='Débloq.' /></span></td>");
        }
    }

    $('.deblockBtn').click(function () {
        let tab = $(this).attr("name").split("/");
        let qteUp = ressources[tab[0]][tab[1]]["qteUp"] = 1;
        let vitUp = ressources[tab[0]][tab[1]]["vitUp"] = 1;
        let cout = ressources[tab[0]][tab[1]]["cout"];
        $(this).closest("td").replaceWith("<td><span data-descr='" + cout[qteUp] + "g pour augmenter la quantite.'><input type='button' class='qteBtn' name='qteBtn" + tab[0] + "/" + tab[1] + "' value='Aug. qté' /></span></td><td><span data-descr='" + cout[vitUp] + "g pour augmenter la vitesse.'><input type='button' class='vitBtn' name='vit" + tab[0] + "/" + tab[1] + "' value='Aug. vit' /></span></td>");
    });

    $('.qteBtn, .vitBtn').click(function () {
        let tab = $(this).attr("name").split("/");

    });

}

// Fenêtre de craft
function setCraftWindow(window) {
    clearCurrentWindow(window);
    windows["craftWindow"] = 1;
    $('#craftTab').css({backgroundImage: "url('assets/background/stone2.png')", backgroundSize: "800px"});
    window.append("<div id='allCraftsDiv'></div>");
    $('#allCraftsDiv').append("<div id='recipesDiv'></div>", "<div id='itemsChoosenDiv'></div>", "<div id='resourcesInvDiv'></div>");
    $('#recipesDiv').append("<div id='recipesWeaponsDiv'></div>", "<div id='recipesArmorsDiv'></div>");
    $('#itemsChoosenDiv').append("<div id='craftItemQuantityDiv'></div>", "<div id='craftItemDescriptionDiv'></div>", "<div id='craftItemImageDiv'></div>");
    $('#resourcesInvDiv').append("<div id='metalInvDiv'></div>", "<div id='boisInvDiv'></div>", "<div id='filInvDiv'></div>", "<div id='tissuInvDiv'></div>", "<div id='cuirInvDiv'></div>");

    // Menu déroulant pour le craft d'arme
    $('#recipesWeaponsDiv').append("<select id='recipesWeapons'><option value='recipesWeaponsNone'>Choisissez une arme</option><optgroup label='-'></optgroup></select>");
    for (let key in weapons) {
        if (key === "1h") $('#recipesWeapons').append("<optgroup label='1 Main' id='recipesWeapons" + key + "'></optgroup>");
        else $('#recipesWeapons').append("<optgroup label='2 Mains' id='recipesWeapons" + key + "'></optgroup>");
        for (let val in weapons[key]) $('#recipesWeapons' + key).append("<option value='" + key + val + "'>" + val + "</option>");
    }

    // Menu déroulant pour le craft d'armure
    $('#recipesArmorsDiv').append("<select id='recipesArmors'><option value='recipesArmorsNone'>Choisissez une armure</option><optgroup label='-'></optgroup></select>");
    for (let key in armors) {
        $('#recipesArmors').append("<optgroup label='" + key + "' id='recipesArmors" + key + "'></optgroup>");
        for (let val in armors[key]) if (val !== "description") $('#recipesArmors' + key).append("<option value='" + key + val + "'>" + val + "</option>");
    }

    // Listener du choix de l'arme ou de l'armure a craft
    $('#recipesWeapons, #recipesArmors').change(function (e) {
        if (e.target.id.includes("Weapons")) {
            $('#recipesQualityWeaponsMetal, #recipesQualityWeaponsBois, #recipesQualityWeaponsCuir, #recipesQualityWeaponsTissu').remove();
            setCraftQuality($('#recipesWeaponsDiv'), $(this).find('option:selected').attr('value'));
        } else {
            $('#recipesQualityArmorsMetal, #recipesQualityArmorsTissu, #recipesQualityArmorsFil, #recipesQualityArmorsCuir').remove();
            setCraftQuality($('#recipesArmorsDiv'), $(this).find('option:selected').attr('value'));
        }
    });

    // Menu déroulant de la quantité d'item à craft
    $('#craftItemQuantityDiv').append("<label>Quantite a craft : </label>", "<br/><input type='number' id='qtyCraftItem' min='0' value='0' />", "<input type=button id='qtyCraftItemBtn' value='Crafter' />");

    for (let key in ressources) {
        $('#' + key.toLowerCase() + 'InvDiv').append("<tr><th>" + key + " :</th></tr><tr><td style='color: white'>----------</td></tr>");
        for (let val in ressources[key]) {
            $('#' + key.toLowerCase() + 'InvDiv').append("<tr><td>" + val + "</td><td> : <input type='text' value='0' id='inv" + key + val + "' name='inv' style='width: 20px' readonly />");
        }
        $('#' + key.toLowerCase() + 'InvDiv').append("<tr><td style='color: white'>----------</td></tr>");
    }
}

// Fenêtre des combats
function setFightWindow(window) {
    clearCurrentWindow(window);
    windows["fightWindow"] = 1;
    $('#fightTab').css({backgroundImage: "url('assets/background/stone2.png')", backgroundSize: "800px"});
    window.append("<div id='allPathsDiv'></div>");
    $('#allPathsDiv').append("<div id='threadPathDiv'></div>", "<div id='hidePathDiv'></div>");
    for (let key in ressources["Fil"]) $('#threadPathDiv').append("<div id='" + key + "'></div>");
    for (let key in ressources["Peau"]) $('#hidePathDiv').append("<div id='" + key + "'></div>");
}

//Fenêtre du shop
function setShopWindow(window) {
    clearCurrentWindow(window);
    windows["shopWindow"] = 1;
    $('#shopTab').css({backgroundImage: "url('assets/background/stone2.png')", backgroundSize: "800px"});
}

// Effacer le fenêtre actuelle
function clearCurrentWindow(window) {
    window.empty();
    for (let key in windows) windows[key] = 0;
    $('#horizontalTabs').find("div").css({
        backgroundImage: "url('assets/background/onglet.jpg')",
        backgroundSize: "cover"
    });
}

// Menu déroulant des matières premières en fonction du choix de l'item a craft
function setCraftQuality(div, recipe) {

    let itemType, itemName, material1, material2;

    if (recipe.includes("1h") || recipe.includes("2h")) {
        itemType = recipe.slice(0, 2);
        itemName = recipe.slice(2);
        material1 = weapons[itemType][itemName].material1;
        material2 = weapons[itemType][itemName].material2;
        div.append("<select id='recipesQualityWeapons" + material1 + "'><option value='recipesQuality" + material1 + "None'>Choisissez le " + material1.toLowerCase() + "</option><optgroup label='-'></optgroup></select>");
        for (let key in ressources[material1]) if (key !== "Charbon") $('#recipesQualityWeapons' + material1).append("<option value='" + key + "'>" + key + "</option>");
        div.append("<select id='recipesQualityWeapons" + material2 + "'><option value='recipesQuality" + material2 + "None'>Choisissez le " + material2.toLowerCase() + "</option><optgroup label='-'></optgroup></select>");
        for (let key in ressources[material2]) if (key !== "Charbon") $('#recipesQualityWeapons' + material2).append("<option value='" + key + "'>" + key + "</option>");
        $('#craftItemDescriptionDiv').empty().append("<p class='descri'>" + weapons[itemType][itemName].description + "</p>", "<div><p class='needed'>Ressources necessaires : </p><br/><label>" + material1 + " : </label><input type='text' id='mat1Needed' size='1' value='" + weapons[itemType][itemName].qtyMaterial1 + "' readonly />&nbsp;<label>" + material2 + " : </label><input type='text' id='mat2Needed' size='1' value='" + weapons[itemType][itemName].qtyMaterial2 + "' readonly /></div>");
    } else {
        if (recipe.includes("Tissu")) {
            itemType = recipe.slice(0, 5);
            itemName = recipe.slice(5);
        } else if (recipe.includes("Cuir")) {
            itemType = recipe.slice(0, 4);
            itemName = recipe.slice(4);
        } else if (recipe.includes("Maille") || recipe.includes("Plaque")) {
            itemType = recipe.slice(0, 6);
            itemName = recipe.slice(6);
        }
        material1 = armors[itemType][itemName].material1;
        material2 = armors[itemType][itemName].material2;
        div.append("<select id='recipesQualityArmors" + material1 + "'><option value='recipesQuality" + material1 + "None'>Choisissez le " + material1.toLowerCase() + "</option><optgroup label='-'></optgroup></select>");
        for (let key in ressources[material1]) if (key !== "Charbon") $('#recipesQualityArmors' + material1).append("<option value='" + key + "'>" + key + "</option>");
        div.append("<select id='recipesQualityArmors" + material2 + "'><option value='recipesQuality" + material2 + "None'>Choisissez le " + material2.toLowerCase() + "</option><optgroup label='-'></optgroup></select>");
        for (let key in ressources[material2]) if (key !== "Charbon") $('#recipesQualityArmors' + material2).append("<option value='" + key + "'>" + key + "</option>");
        $('#craftItemDescriptionDiv').empty().append("<p class='descri'>" + armors[itemType].description + "</p>", "<div><p class='needed'>Ressources necessaires : </p><br/><label>" + material1 + " : </label><input type='text' id='mat1Needed' size='1' value='" + armors[itemType][itemName].qtyMaterial1 + "' readonly />&nbsp;<label>" + material2 + " : </label><input type='text' id='mat2Needed' size='1' value='" + armors[itemType][itemName].qtyMaterial2 + "' readonly /></div>");
    }

    // Listener sur les menus déroulant des matériaux pour l'affichage de l'image de l'item en fonction des matériaux choisis
    $('#recipesQualityWeaponsMetal, #recipesQualityArmorsMetal, #recipesQualityWeaponsBois, #recipesQualityWeaponsTissu, #recipesQualityArmorsTissu, #recipesQualityWeaponsCuir, #recipesQualityArmorsCuir, #recipesQualityArmorsFil').change(function () {
        setCraftItemImage(itemType, itemName, material1, material2);
    });
}

// Mise en place de l'image de l'item à craft selon les matériaux choisis
function setCraftItemImage(type, name, mat1, mat2) {

    if (type === "1h" || type === "2h") {
        let mat1Val = $('#recipesQualityWeapons' + mat1).find('option:selected').attr('value');
        let mat2Val = $('#recipesQualityWeapons' + mat2).find('option:selected').attr('value');
        if (!mat1Val.includes("None") && !mat2Val.includes("None")) $('#craftItemImageDiv').empty().append("<img src='assets/craft/weapons/" + type + name + mat1Val + mat2Val + "' alt='" + name + " en " + mat1Val + " et en " + mat2Val + "' title='" + name + " en " + mat1Val + " et en " + mat2Val + "' />");
    } else {
        let mat1Val = $('#recipesQualityArmors' + mat1).find('option:selected').attr('value');
        let mat2Val = $('#recipesQualityArmors' + mat2).find('option:selected').attr('value');
        if (!mat1Val.includes("None") && !mat2Val.includes("None")) {
            if (mat2 === "Fil") $('#craftItemImageDiv').empty().append("<img src='assets/craft/armors/" + type + "/" + type + name + mat1Val + "' alt='" + name + " de " + type + " en " + mat1Val + " et en " + mat2Val + "' title='" + name + " de " + type + " en " + mat1Val + " et en " + mat2Val + "' />");
            else $('#craftItemImageDiv').empty().append("<img src='assets/craft/armors/" + type + "/" + type + name + mat1Val + mat2Val + "' alt='" + name + " de " + type + " en " + mat1Val + " et en " + mat2Val + "' title='" + name + " de " + type + " en " + mat1Val + " et en " + mat2Val + "' />");
        }
    }
}

//    $.post('getQtyMaterial.php', {it_type: itemType, it_name: itemName});