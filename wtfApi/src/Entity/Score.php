<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Score
 *
 * @ORM\Table(name="score")
 * @ORM\Entity
 */
class Score
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_score", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idScore;

    /**
     * @var int
     *
     * @ORM\Column(name="note", type="integer", nullable=false, options={"comment"="note en pourcentage"})
     */
    private $note;


}
