<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Personne
 *
 * @ORM\Table(name="personne")
 * @ORM\Entity(repositoryClass="App\Repository\PersonneRepository")
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
     * @ORM\ManyToMany(targetEntity="Role", inversedBy="idPersonne", fetch="EAGER")
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

    public function getIdPersonne(): ?int
    {
        return $this->idPersonne;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNationalite(): ?string
    {
        return $this->nationalite;
    }

    public function setNationalite(string $nationalite): self
    {
        $this->nationalite = $nationalite;

        return $this;
    }

    /**
     * @return Collection|Video[]
     */
    public function getIdVideo(): Collection
    {
        return $this->idVideo;
    }

    public function addIdVideo(Video $idVideo): self
    {
        if (!$this->idVideo->contains($idVideo)) {
            $this->idVideo[] = $idVideo;
        }

        return $this;
    }

    public function removeIdVideo(Video $idVideo): self
    {
        if ($this->idVideo->contains($idVideo)) {
            $this->idVideo->removeElement($idVideo);
        }

        return $this;
    }

    /**
     * @return Collection|Role[]
     */
    public function getIdRole(): Collection
    {
        return $this->idRole;
    }

    public function addIdRole(Role $idRole): self
    {
        if (!$this->idRole->contains($idRole)) {
            $this->idRole[] = $idRole;
        }

        return $this;
    }

    public function removeIdRole(Role $idRole): self
    {
        if ($this->idRole->contains($idRole)) {
            $this->idRole->removeElement($idRole);
        }

        return $this;
    }

}
