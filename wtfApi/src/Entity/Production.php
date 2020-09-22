<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Production
 *
 * @ORM\Table(name="production")
 * @ORM\Entity
 */
class Production
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_prod", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idProd;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=60, nullable=false)
     */
    private $nom;


}
