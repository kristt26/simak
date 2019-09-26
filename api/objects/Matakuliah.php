<?php
class Matakuliah
{
    private $conn;
    private $table_name="program_studi";
    public $kmk;
    public $kdps;
    public $kdkurikulum;
    public $nmmk;
    public $sks;
    public $smt;
    public $status_mk;

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
        $query = "SELECT * FROM ".$this->table_name." WHERE kmk=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kmk);
        $stmt->execute();
        return $stmt;
    }
    
    public function create()
    {
        $query = "INSERT INTO ".$this->table_name." SET kmk=?, kdps=?, kdkurikulum=?, nmmk=?, sks=?, smt=?, status_mk=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kmk);
        $stmt->bindParam(2, $this->kdps);
        $stmt->bindParam(3, $this->kdkurikulum);
        $stmt->bindParam(4, $this->nmmk);
        $stmt->bindParam(5, $this->sks);
        $stmt->bindParam(6, $this->smt);
        $stmt->bindParam(7, $this->status_mk);
        
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
        $query = "UPDATE ".$this->table_name." SET nmmk=?, sks=?, smt=?, status_mk=? WHERE kmk=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->nmmk);
        $stmt->bindParam(2, $this->sks);
        $stmt->bindParam(3, $this->smt);
        $stmt->bindParam(4, $this->status_mk);
        $stmt->bindParam(5, $this->kmk);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }

    public function delete()
    {
        $query = "DELETE FROM ".$this->table_name." WHERE kmk=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->kmk);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }
}

?>