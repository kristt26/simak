<?php
class Mahasiswa
{
    private $conn;
    private $table_name="mahasiswa";
    public $npm;
    public $kdps;
    public $jenjang;
    public $kelas;
    public $nmmhs;
    public $tmlhr;
    public $tglhr;
    public $jk;
    public $agama;
    public $kewarga;
    public $pendidikan;
    public $nmsmu;
    public $jursmu;
    public $kotasmu;
    public $kabsmu;
    public $provsmu;
    public $pekerjaan;
    public $almt;
    public $notlp;
    public $status;
    public $jmsaudara;
    public $nmayah;
    public $almayah;
    public $nmibu;
    public $sumbiaya;
    public $statuskul;
    public $tgdaftar;

    public function __construct($db) 
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT * FROM ".$this->table_name."";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne()
    {
        $query = "SELECT * FROM ".$this->table_name." WHERE npm=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->npm);
        $stmt->execute();
        return $stmt;
    }
    
    public function create()
    {
        $query = "INSERT INTO ".$this->table_name." SET npm=?, kdps=?, jenjang=?, kelas=?, nmmhs=?, tmlhr=?, tglhr=?, jk=?, agama=?, kewarga=?, pendidikan=?, nmsmu=?, jursmu=?, kotasmu=?, kabsmu=?, provsmu=?, pekerjaan=?, almt=?, notlp=?, status=?, jmsaudara=?, nmayah, almtayah=?, nmibu=?, sumbiaya=?, statuskul=?, tgdaftar=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->npm);
        $stmt->bindParam(2, $this->kdps);
        $stmt->bindParam(3, $this->jenjang);
        $stmt->bindParam(4, $this->kelas);
        $stmt->bindParam(5, $this->nmmhs);
        $stmt->bindParam(6, $this->tmlhr);
        $stmt->bindParam(7, $this->tglhr);
        $stmt->bindParam(8, $this->jk);
        $stmt->bindParam(9, $this->agama);
        $stmt->bindParam(10, $this->kewarga);
        $stmt->bindParam(11, $this->pendidikan);
        $stmt->bindParam(12, $this->nmsmu);
        $stmt->bindParam(13, $this->jursmu);
        $stmt->bindParam(14, $this->kotasmu);
        $stmt->bindParam(15, $this->kabsmu);
        $stmt->bindParam(16, $this->provsmu);
        $stmt->bindParam(17, $this->pekerjaan);
        $stmt->bindParam(18, $this->almt);
        $stmt->bindParam(19, $this->notlp);
        $stmt->bindParam(20, $this->status);
        $stmt->bindParam(21, $this->jmsaudara);
        $stmt->bindParam(22, $this->nmayah);
        $stmt->bindParam(23, $this->almayah);
        $stmt->bindParam(24, $this->nmibu);
        $stmt->bindParam(25, $this->sumbiaya);
        $stmt->bindParam(26, $this->statuskul);
        $stmt->bindParam(27, $this->tgdaftar);

        if($stmt->execute()){
            // $this->idpengguna= $this->conn->lastInsertId();
            return true;
        }else
        {
            return false;
        }
    }

    public function update()
    {
        $query = "UPDATE ".$this->table_name." SET kdps=?, jenjang=?, kelas=?, nmmhs=?, tmlhr=?, tglhr=?, jk=?, agama=?, kewarga=?, pendidikan=?, nmsmu=?, jursmu=?, kotasmu=?, kabsmu=?, provsmu=?, pekerjaan=?, almt=?, notlp=?, status=?, jmsaudara=?, nmayah, almtayah=?, nmibu=?, sumbiaya=?, statuskul=?, tgdaftar=? WHERE thakademik=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kdps);
        $stmt->bindParam(2, $this->jenjang);
        $stmt->bindParam(3, $this->kelas);
        $stmt->bindParam(4, $this->nmmhs);
        $stmt->bindParam(5, $this->tmlhr);
        $stmt->bindParam(6, $this->tglhr);
        $stmt->bindParam(7, $this->jk);
        $stmt->bindParam(8, $this->agama);
        $stmt->bindParam(9, $this->kewarga);
        $stmt->bindParam(10, $this->pendidikan);
        $stmt->bindParam(11, $this->nmsmu);
        $stmt->bindParam(12, $this->jursmu);
        $stmt->bindParam(13, $this->kotasmu);
        $stmt->bindParam(14, $this->kabsmu);
        $stmt->bindParam(15, $this->provsmu);
        $stmt->bindParam(16, $this->pekerjaan);
        $stmt->bindParam(17, $this->almt);
        $stmt->bindParam(18, $this->notlp);
        $stmt->bindParam(19, $this->status);
        $stmt->bindParam(20, $this->jmsaudara);
        $stmt->bindParam(21, $this->nmayah);
        $stmt->bindParam(22, $this->almayah);
        $stmt->bindParam(23, $this->nmibu);
        $stmt->bindParam(24, $this->sumbiaya);
        $stmt->bindParam(25, $this->statuskul);
        $stmt->bindParam(26, $this->tgdaftar);
        $stmt->bindParam(27, $this->npm);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }

    public function delete()
    {
        $query = "DELETE FROM ".$this->table_name." WHERE npm=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->npm);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }
}

?>