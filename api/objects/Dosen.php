<?php
class Dosen
{
    private $conn;
    private $table_name="dosen";
    public $nidn;
    public $nmdsn;
    public $pendakhir;
    public $spekdsn;
    public $almtdsn;
    public $notlpdsn;
    public $stdsn;
    public $thmasuk;
    public $noskstimik;
    public $tgskstimik;

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
        $query = "SELECT * FROM ".$this->table_name." WHERE nidn=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->nidn);
        $stmt->execute();
        return $stmt;
    }
    
    public function create()
    {
        $query = "INSERT INTO ".$this->table_name." SET nidn=?, nmdsn=?, pendakhir=?, spekdsn=?, almtdsn=?, notlpdsn=?, stdsn=?, thmasuk=?, noskstimik=?, tgskstimik=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->nidn);
        $stmt->bindParam(2, $this->nmdsn);
        $stmt->bindParam(3, $this->pendakhir);
        $stmt->bindParam(4, $this->spekdsn);
        $stmt->bindParam(5, $this->almtdsn);
        $stmt->bindParam(6, $this->notlpdsn);
        $stmt->bindParam(8, $this->stdsn);
        $stmt->bindParam(9, $this->thmasuk);
        $stmt->bindParam(10, $this->noskstimik);
        
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
        $query = "UPDATE ".$this->table_name." SET nmdsn=?, pendakhir=?, spekdsn=?, almtdsn=?, notlpdsn=?, stdsn=?, thmasuk=?, noskstimik=?, tgskstimik=? WHERE nidn=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->nmdsn);
        $stmt->bindParam(2, $this->pendakhir);
        $stmt->bindParam(3, $this->spekdsn);
        $stmt->bindParam(4, $this->almtdsn);
        $stmt->bindParam(5, $this->notlpdsn);
        $stmt->bindParam(6, $this->stdsn);
        $stmt->bindParam(7, $this->thmasuk);
        $stmt->bindParam(8, $this->noskstimik);
        $stmt->bindParam(9, $this->tgskstimik);
        $stmt->bindParam(10, $this->nidn);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }

    public function delete()
    {
        $query = "DELETE FROM ".$this->table_name." WHERE nidn=?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->nidn);

        if($stmt->execute()){
            return true;
        }else
        {
            return false;
        }
    }
}

?>