<!DOCTYPE html>
<html ng-app="Apps">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
  <title>SISTEM AKADEMIK STIMIK1011</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="assets/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="assets/bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="assets/bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="assets/dist/css/AdminLTE.min.css">
  <link rel="stylesheet" href="assets/dist/css/main.css">
  <!-- <link rel="stylesheet" href="node_modules/sweetalert2/dist/sweetalert2.css"> -->
  <link rel="stylesheet" href="assets/node_modules/angular-datatables/dist/css/angular-datatables.css">
  <link rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/angular-bootstrap-toggle@0.4.0/dist/angular-bootstrap-toggle.min.css">
  <link rel="stylesheet" href="assets/node_modules/ui-bootstrap4/dist/ui-bootstrap-csp.css">

  <!-- iCheck -->
  <link rel="stylesheet" href="plugins/iCheck/square/blue.css">
  <script src="assets/bower_components/jquery/dist/jquery.min.js"></script>
  <script src="assets/bower_components/angular/angular.min.js"></script>
  <script src="assets/bower_components/angular/angular-animate.min.js"></script>
  <script src="assets/bower_components/angular/angular-route.min.js"></script>
  <script src="assets/bower_components/angular/angular-sanitize.min.js"></script>
  <script src="assets/bower_components/angular/angular-resource.js"></script>
  <script src="assets/bower_components/angular/angularjs/release/angular-ui-router.js"></script>
  <script src="assets/node_modules/ui-bootstrap4/dist/ui-bootstrap-tpls.js"></script>
  <link rel='stylesheet' href='assets/bower_components/angular/loading-bar.css' type='text/css' media='all' />
  <script type='text/javascript' src='assets/bower_components/angular/loading-bar.js'></script>

  <script src="assets/bower_components/angular-ui-select2/src/select2.js"></script>

  <link rel="stylesheet" href="assets/node_modules/angular-datatables/dist/css/angular-datatables.css">
  <script src="assets/node_modules/datatables.net/js/jquery.dataTables.js"></script>
  <script src="assets/node_modules/angular-datatables/dist/angular-datatables.js"></script>
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
  <script src="assets/dist/js/angular-locale_id-id.js"></script>
  <script
    src="https://cdn.jsdelivr.net/npm/angular-bootstrap-toggle@0.4.0/dist/angular-bootstrap-toggle.min.js"></script>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition" ng-controller="transkipController">
  <div id="loading-bar-container"></div>
  <div class="box">
    <div class="box-header with-border">
      <center>
        <h2 class="box-title">KEMAJUAN STUDI MAHASISWA</h2>
      </center>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-2">
            <h3 class="box-title">Nama <br>NPM</h3>
          </div>
          <div class="col-md-4">
            <h3 class="box-title">: {{datas.nmmhs}} <br>: {{datas.npm}}</h3>

          </div>
        </div>
      </div>

    </div>
    <div class="box-body">
      <div class="row" style="padding-left: 20px;">
        <table class="table table-bordered">
          <tr>
            <th>Kode</th>
            <th>MATAKULIAH</th>
            <th>SEMESTER</th>
            <th>SKS</th>
            <th>NILAI</th>
            <th>NXSKS</th>
            <th>HURUF</th>
            <th>Keterangan</th>
          </tr>
          <tr ng-repeat="item in datas.matakuliah">
            <td>{{item.kmk}}</td>
            <td>{{item.nmmk}}</td>
            <td>{{item.smt}}</td>
            <td>{{item.sks}}</td>
            <td>{{item.valuee}}</td>
            <td>{{item.nxsks}}</td>
            <td>{{item.nilai}}</td>
            <td>{{item.ket}}</td>
          </tr>
        </table>
      </div>


    </div>
  </div>
  <!-- jQuery 3 -->

  <!-- Bootstrap 3.3.7 -->
  <script src="assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
  <script src="plugins/iCheck/icheck.min.js"></script>
  <script src="assets/dist/js/lib/pdf.js"></script>
  <script src="assets/dist/js/lib/angular-pdf.min.js"></script>
  <script>
    angular.module('Apps', [])
    .controller('transkipController', function($scope, $http){
      $scope.datas = {};
      const urlParams = new URLSearchParams(window.location.search);
      console.log(urlParams.get('npm'));
      $http({
        method: "get",
        url: "https://www.restsimak.stimiksepnop.ac.id/v2/transkip/" + urlParams.get('npm')
      }).then(res=>{
        $scope.datas = res.data;
      })
    })
  </script>
</body>

</html>
