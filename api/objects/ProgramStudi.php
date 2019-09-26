<?php
class ProgramStudi
{
    private $conn;
    private $table_name="program_studi";
    public $kdps;
    public $kdmhs;
    public $nmps;
    public $ininmps;
    public $jenjang;
    public $skkop;
    public $tgskkop;
    public $akreditasi;
    public $nakre;
    public $kaprodi;

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
        $query = "SELECT * FROM ".$this->table_name." WHERE kdps=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kdps);
        $stmt->execute();
        return $stmt;
    }
    
    public function create()
    {
        $query = "INSERT INTO ".$this->table_name." SET kdps=?, kdmhs=?, nmps=?, ininmps=?, jenjang=?, skkop=?, tgskkop=?, akreditasi=?, nakre=?, kaprodi=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kdps);
        $stmt->bindParam(2, $this->kdmhs);
        $stmt->bindParam(3, $this->nmps);
        $stmt->bindParam(4, $this->ininmps);
        $stmt->bindParam(5, $this->jenjang);
        $stmt->bindParam(6, $this->skkop);
        $stmt->bindParam(7, $this->tgskkop);
        $stmt->bindParam(8, $this->akreditasi);
        $stmt->bindParam(9, $this->nakre);
        $stmt->bindParam(10, $this->kaprodi);

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
        $query = "UPDATE ".$this->table_name." SET kdmhs=?, nmps=?, ininmps=?, jenjang=?, skkop=?, tgskkop=?, akreditasi=?, nakre=?, kaprodi=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kdmhs);
        $stmt->bindParam(2, $this->nmps);
        $stmt->bindParam(3, $this->ininmps);
        $stmt->bindParam(4, $this->jenjang);
        $stmt->bindParam(5, $this->skkop);
        $stmt->bindParam(6, $this->tgskkop);
        $stmt->bindParam(7, $this->akreditasi);
        $stmt->bindParam(8, $this->nakre);
        $stmt->bindParam(9, $this->kaprodi);
        $stmt->bindParam(10, $this->kdps);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }

    public function delete()
    {
        $query = "DELETE FROM ".$this->table_name." WHERE kdps=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kdps);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }
}

?>