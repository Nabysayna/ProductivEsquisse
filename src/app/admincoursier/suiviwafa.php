

<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
        <link rel="icon" href="../../favicon.ico">
        <title>Du Modus</title>
        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="css/font-awesome.min.css">

	<style>
		th {
		  padding-top : 1rem ;
		  padding-bottom : 1rem ;
		  padding-left : 0.7rem ;
		  padding-right : 0.7rem ;
		}

		td {
		  padding-top : 0.7rem ;
		  padding-bottom : 0.7rem ;
		  padding-left : 0.7rem ;
		  padding-right : 0.7rem ;
		}

		table {
		    border: 1px solid black;
	            border-collapse : separate ;
		}

	</style>

    </head>

<body style="text-align : -webkit-center ;">

<h1 style="text-align : center ;" class="panel-header">SUIVI DES DOSSIERS DES CLIENTS DE WAFACASH</h1>

<h2 style="text-align : center ;">NOM CC ET ZONE<h2>

 <div class="col-sm-3" style="margin-bottom : 3rem ;">

 <select class="form-control input-sm" id="selectpos">
        <option value="Etat">Etat</option>
	<option value="second">Second point de vente</option>
	<option value="troisieme">Troisième point de vente</option>
 </select>

</div>

 <div class="col-sm-3" style="margin-bottom : 3rem ;">

 <button class="btn btn-success" onclick="infosPoint();">
	Accéder aux détails du point
 </button>

</div>



<table class="table-striped table-bordered" style="background-color : white ; ">
    <tr>	
	<th>Etapes/Point de vente</th>

	<th>RV</th>

	<th>Signé Cachet</th>

	<th>Date Dépôt Caution</th>

	<th>Date Dépôt Wafa</th>

	<th>Date Validation</th>

	<th>Opérationnel</th>
    </tr>
<?php if (isset($_GET['pos'])) {


   if ($_GET['pos']=="Etat") { ?>
    <tr>	
	<td>Modou Fall Lampor</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">
	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

    </tr>

<?php    }


  if ($_GET['pos']=="second") { ?> 
    <tr>	
	<td>Second Point</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">
	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

    </tr>
<?php } 

  if ($_GET['pos']=="troisieme") { ?>
    <tr>	
	<td>Troisieme point</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">
	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

	<td>
	   Etat : <select class="form-control input-sm">
                   <option>Etat</option>
                  </select>
	  <br>

	   Date : <input type="date">

	</td>

    </tr>

<?php  }

} 

?>

</table>

<script>
	function infosPoint(){
		var e = document.getElementById("selectpos");
		var strUser = e.options[e.selectedIndex].value;
		console.log("You selected "+strUser) ;
		location.assign(location.href+'?pos='+strUser) ;
	}	
</script>

</body>