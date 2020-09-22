<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Personne
 *
 * @ORM\Table(name="personne")
 * @ORM\Entity
 */
class Personne
{
    /**
     * @var int
     *
     * @ORM\Column(name="id_personne", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $idPersonne;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=30, nullable=false)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="prenom", type="string", length=30, nullable=false)
     */
    private $prenom;

    /**
     * @var string
     *
     * @ORM\Column(name="nationalite", type="string", length=30, nullable=false)
     */
    private $nationalite;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Video", inversedBy="idPersonne")
     * @ORM\JoinTable(name="participer",
     *   joinColumns={
     *     @ORM\JoinColumn(name="id_personne", referencedColumnName="id_personne")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="id_video", referencedColumnName="id_video")
     *   }
     * )
     */
    private $idVideo;

    /**
     * @var \Doctrine\Common\Collections\Collection
     *
     * @ORM\ManyToMany(targetEntity="Role", inversedBy="idPersonne")
     * @ORM\JoinTable(name="posseder",
     *   joinColumns={
     *     @ORM\JoinColumn(name="id_personne", referencedColumnName="id_personne")
     *   },
     *   inverseJoinColumns={
     *     @ORM\JoinColumn(name="id_role", referencedColumnName="id_role")
     *   }
     * )
     */
    private $idRole;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->idVideo = new \Doctrine\Common\Collections\ArrayCollection();
        $this->idRole = new \Doctrine\Common\Collections\ArrayCollection();
    }

}
