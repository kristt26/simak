<?php
class DosenWali
{
    private $conn;
    private $table_name="dosen_wali";
    public $Id;
    public $npm;
    public $thakademik;
    public $gg;
    public $nidn;

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
        $query = "INSERT INTO ".$this->table_name." SET npm=?, thakademik=?, gg=?, nidn=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->npm);
        $stmt->bindParam(2, $this->thakademik);
        $stmt->bindParam(3, $this->gg);
        $stmt->bindParam(4, $this->nidn);
        
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
        $query = "UPDATE ".$this->table_name." SET thakademik=?, gg=?, nidn=? WHERE npm=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->thakademik);
        $stmt->bindParam(2, $this->gg);
        $stmt->bindParam(3, $this->nidn);
        $stmt->bindParam(4, $this->npm);

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