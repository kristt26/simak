<?php
class TahunAkademik
{
    private $conn;
    private $table_name="tahun_akademik";
    public $thakademik;
    public $gg;
    public $status;

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

    public function readOne($a)
    {
        $query = "SELECT * FROM ".$this->table_name." WHERE status=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $a);
        $stmt->execute();
        return $stmt;
    }
    
    public function create()
    {
        $query = "INSERT INTO ".$this->table_name." SET thakademik=?, gg=?, status=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->thakademik);
        $stmt->bindParam(2, $this->gg);
        $stmt->bindParam(3, $this->status);

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
        $query = "UPDATE ".$this->table_name." SET gg=?, status=? WHERE thakademik=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->gg);
        $stmt->bindParam(2, $this->status);
        $stmt->bindParam(3, $this->thakademik);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }

    public function delete()
    {
        $query = "DELETE FROM ".$this->table_name." WHERE thakademik=?";
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