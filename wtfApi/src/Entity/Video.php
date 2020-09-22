<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Video
 *
 * @ORM\Table(name="video")
 * @ORM\Entity
 */
class Video
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_video", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idVideo;

    /**
     * @var string
     *
     * @ORM\Column(name="titre", type="string", length=254, nullable=false)
     */
    private $titre;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_sortie", type="date", nullable=false)
     */
    private $dateSortie;

    /**
     * @var string
     *
     * @ORM\Column(name="poster", type="string", length=254, nullable=false)
     */
    private $poster;

    /**
     * @var string|null
     *
     * @ORM\Column(name="plot", type="text", length=65535, nullable=true)
     */
    private $plot;

    /**
     * @var string|null
     *
     * @ORM\Column(name="trailer", type="string", length=254, nullable=true)
     */
    private $trailer;

    /**
     * @var string|null
     *
     * @ORM\Column(name="vo", type="string", length=50, nullable=true)
     */
    private $vo;

    /**
     * @var int|null
     *
     * @ORM\Column(name="id_prod", type="integer", nullable=true)
     */
    private $idProd;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Categorie", inversedBy="idVideo")
     * @ORM\JoinTable(name="appartenir",
     *   joinColumns={
     *     @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="id_categ", referencedColumnName="id_categ")
     *   }
     * )
     */
    private $idCateg;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Plateforme", inversedBy="idVideo")
     * @ORM\JoinTable(name="diffuser",
     *   joinColumns={
     *     @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="id_plateforme", referencedColumnName="id_plateforme")
     *   }
     * )
     */
    private $idPlateforme;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Personne", mappedBy="idVideo")
     */
    private $idPersonne;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Utilisateur", mappedBy="idVideo")
     */
    private $idUtilisateur;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idCateg = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idPlateforme = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idPersonne = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idUtilisateur = new \Doctrine\Common\Collections\ArrayCollection();
    }

}
