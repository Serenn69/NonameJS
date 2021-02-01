<?php
try {
    $bdd = new PDO("mysql:host=localhost;dbname=dbnoname;charset=utf8", "root", "");
} catch (Exception $e) {
    die("Erreur : " . $e->getMessage());
}
if (isset($_POST["it_type"]) && isset($_POST["it_name"])) {
    $req = $bdd->query("SELECT qtyMaterial1, qtyMaterial2 FROM titems WHERE it_type='" . $_POST['it_type'] . "' AND it_name='" . $_POST['it_name'] . "'");

    $result = null;
    while ($data = $req->fetch(PDO::FETCH_ASSOC)) {
        for ($i = 1; $i <= count($data); $i++) {
            if ($i == count($data)) $result .= $data["qtyMaterial" . $i];
            else $result .= $data["qtyMaterial" . $i] . "/";
        }
    }
    $doc = new DOMDocument();
    $mat = $doc->getElementById("mat1Needed");
    $mat->setAttribute("value", $data["qtyMaterial1"]);
    $mat = $doc->getElementById("mat2Needed");
    $mat->setAttribute("value", $data["qtyMaterial2"]);
}
?>