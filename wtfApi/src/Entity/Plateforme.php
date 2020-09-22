<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Plateforme
 *
 * @ORM\Table(name="plateforme")
 * @ORM\Entity
 */
class Plateforme
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_plateforme", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idPlateforme;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=30, nullable=false)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="redirection", type="string", length=254, nullable=false)
     */
    private $redirection;

    /**
     * @var string
     *
     * @ORM\Column(name="logo", type="string", length=254, nullable=false)
     */
    private $logo;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Video", mappedBy="idPlateforme")
     */
    private $idVideo;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idVideo = new \Doctrine\Common\Collections\ArrayCollection();
    }

}
